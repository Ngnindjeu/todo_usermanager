
import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TodoService} from "../todo.service";
import {DataServiceService} from "../data-service.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  public title  ='';
  notValid = false;

  constructor(public activeModal :NgbActiveModal, private dataService: DataServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  save() : void {
    if(this.title.length >0){
      this.dataService.addTodo(this.title);
      this.dataService.getTodos();
      this.activeModal.close(this.title)
      this.dismiss();
    } else {
      this.notValid = true;
    }

  }
  dismiss(): void {
    this.router.navigateByUrl("/");
  }

}


