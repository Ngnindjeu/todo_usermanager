import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CrudService} from '../../services/http/crud.service';
import {User} from '../../models/user';
import {AlertService} from "../../services/alert/alert.service";
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService,
    private alertService: AlertService) {
    this.user = ({} as User);
  }

  ngOnInit(): void {
  }

  async addUser(form: any): Promise<void> {
    const userName: string = this.user.firstName + ' ' + this.user.lastName;
    (await this.crudService.createUser(this.user)).subscribe({
      next: (data: any) => {
        form.reset();
        this.router.navigate(['/']).then((res) => {
          console.log('Navigated to start page: ', res);
        }).catch((err) => {
          console.log(err.message);
        });

        this.alertService.success((<any>data).message + ': ' + userName, {autoClose: true});
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            window.alert('Sie erlauben diese Aktion nicht durchzuführen');
          }
        }
      }
    });
  }
}
