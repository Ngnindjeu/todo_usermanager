import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TodoService } from "../todo.service";
import { ToDoEntry } from "../TodoEntry";
import {AddTodoComponent} from "../add-todo/add-todo.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {DataServiceService} from "../data-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Output() update: EventEmitter<void> = new EventEmitter<void>();
  undoneList: ToDoEntry[] = [];
  todos: ToDoEntry[] = [];
  @Input()test: ToDoEntry[] = [];
  @Input()todoList: Observable<ToDoEntry[]> = new Observable<ToDoEntry[]>();

  constructor(private modalService: NgbModal,
              private todoService: TodoService,
              private dataService: DataServiceService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.dataService.undoneList.subscribe((list:ToDoEntry[]) => {
      console.log(list)
      this.undoneList = list;
    })
  }

  async openModal() {
    const modal = this.modalService.open(AddTodoComponent);
    //const title = await modal.result
    //this.todoList.push(new ToDoEntry(title));

  }
  markAsDone(todo: ToDoEntry) {
    console.log("mark as done");
    this.dataService.markAsDone(todo);
    this.dataService.getTodos();
  }

  getTodos() {
    this.todoList.subscribe((res:any) => {
      this.todos = res.todoList;
      this.undoneList = this.todos.filter((todo: ToDoEntry) => {
        return !todo.done;
      })
    })
  }

}

