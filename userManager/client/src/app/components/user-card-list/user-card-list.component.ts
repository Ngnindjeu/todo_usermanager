import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditUserComponent} from "../edit-user/edit-user.component";
import {CrudService} from '../../services/http/crud.service';
import {User} from '../../models/user';
import {AlertService} from "../../services/alert/alert.service";
import {HttpErrorResponse} from '@angular/common/http';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrls: ['./user-card-list.component.css']
})
export class UserCardListComponent implements OnInit {
  users: User[] = [];
  closeModal: string = '';
  userToDelete: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private socket: Socket) {
  }

  ngOnInit(): void {
    this.socket.on('EVENT_UPDATE_STATE', () => {
      this.crudService.getUsers().subscribe({
        next: data => {
          this.users = (data as any).userList
        }
      })
    })

    this.crudService.getUsers().subscribe({
      next: data => {
        this.users = (<any>data).userList;
      },
      error: error => {
        console.error('There was an error!', error.message);
      }
    });
  }

  deleteUser(modal: any, userToDelete: User): void {
    modal.close();
    this.crudService.deleteUser(userToDelete.id).subscribe({
      next: data => {
        const msg: string = (<any>data).message + ': ' + userToDelete.firstName + ' ' + userToDelete.lastName;
        this.alertService.success(msg, {autoClose: true});
        this.users = this.users.filter((user) => user.id !== userToDelete.id)
      },
      error: error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            window.alert('Sie erlauben diese Aktion nicht durchzuführen');
          }
        }
      }
    });
  }

  updateUser(user: User): void {
    this.crudService.updateUser(user).subscribe({
      next: data => {
        this.alertService.success((<any>data).message, {autoClose: true});
      },
      error: error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            window.alert('Sie erlauben diese Aktion nicht durchzuführen');
          }
        }
      }
    });
  }

  async openModal(user: User): Promise<void> {
    try {
      const ref = this.modalService.open(EditUserComponent);
      ref.componentInstance.firstName = user.firstName;
      ref.componentInstance.lastName = user.lastName;
      const {firstName, lastName} = await ref.result;
      user.firstName = firstName;
      user.lastName = lastName;
      this.updateUser(user);
    } catch (e) {
      console.log("Window closed", e);
    }
  }

  triggerModal(userToDelete: User, content: TemplateRef<any>) {
    this.userToDelete = userToDelete;
    this.modalService.open(content).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
    console.log(this.closeModal);
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
