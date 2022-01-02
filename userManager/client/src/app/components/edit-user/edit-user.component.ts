import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modal-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public firstName: string = '';
  public lastName: string = '';

  constructor(
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  save(): void {
    if (this.firstName.trim().length > 0 && this.lastName.trim().length > 0) {
      this.activeModal.close({firstName: this.firstName, lastName: this.lastName});
    }
  }
}
