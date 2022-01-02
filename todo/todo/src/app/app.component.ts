import { Component, OnInit } from '@angular/core';
import {TodoService} from "./todo.service";
import {ToDoEntry} from "./TodoEntry";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddTodoComponent} from "./add-todo/add-todo.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  constructor(private  modalservice: NgbModal) {


  }
ngOnInit() {
    if(location.pathname ==='/new-Entry/'){
      this.modalservice.open(AddTodoComponent);
    }
}


}




