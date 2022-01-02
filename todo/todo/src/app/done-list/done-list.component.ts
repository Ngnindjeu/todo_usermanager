import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToDoEntry} from "../TodoEntry";
import {TodoService} from "../todo.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.css']
})
export class DoneListComponent implements OnInit {
  @Input() todoList: Observable<ToDoEntry[]> = new Observable<ToDoEntry[]>();
  @Output() update: EventEmitter<void> = new EventEmitter<void>();
  doneList: ToDoEntry[] = [];
  todos: ToDoEntry[] = [];

  constructor(private dataService: DataServiceService, private todoService: TodoService) {
     this.dataService.getTodos();
  }

  ngOnInit(): void {
   this.dataService.doneList.subscribe((list:ToDoEntry[]) => {
     console.log(list)
     this.doneList = list;
   })
  }

  markAsUnDone(todo: ToDoEntry) {
        this.dataService.markAsUnDone(todo);
        this.dataService.getTodos();
  }

  deleteTodo(todo: ToDoEntry) {
    this.dataService.deleteTodo(todo);
    this.dataService.getTodos();
  }

}
