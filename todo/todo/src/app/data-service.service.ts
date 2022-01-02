import { Injectable } from '@angular/core';
import {TodoService} from "./todo.service";
import {ToDoEntry} from "./TodoEntry";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  todoList: ToDoEntry[] = [];
  undoneList: BehaviorSubject<ToDoEntry[]> = new BehaviorSubject<ToDoEntry[]>([]);
  doneList: BehaviorSubject<ToDoEntry[]> = new BehaviorSubject<ToDoEntry[]>([]);

  constructor( private todoService: TodoService, private router: Router) {
    this.getTodos();
  }

  async getTodos(){
    await this.todoService.getTodos().subscribe((res: any) => {
      this.todoList =  res.todoList;
      this.doneList.next(this.todoList.filter((todo: ToDoEntry) => {
        return todo.done;
      }));
      this.undoneList.next(this.todoList.filter((todo: ToDoEntry) => {
        return !todo.done;
      }));
    })


    /* console.log("in data service")

     this.todoService.getTodos().pipe(
       map(e => {
         this.todoList = e;
         this.doneList.next(this.todoList.filter(e => e.done));
         this.undoneList.next(this.todoList.filter(e => !e.done));
         console.log("Test");
         console.log(this.doneList);
       })
     ).subscribe();

     */
  }

  markAsDone(todo: ToDoEntry) {
    for(let i = 0; i < this.todoList.length; i++) {
      if(this.todoList[i].title === todo.title && this.todoList[i].date == todo.date) {
        this.todoService.markAsDone(i).subscribe((res) => {
          console.log(res);
        })
      }
    }

  }

  markAsUnDone(todo: ToDoEntry) {
    for(let i = 0; i < this.todoList.length; i++) {
      if(this.todoList[i].title === todo.title && this.todoList[i].date == todo.date) {
        this.todoService.markAsUnDone(i).subscribe((res) => {
          console.log(res);
        })
      }
    }
  }

  deleteTodo(todo: ToDoEntry) {
    for(let i = 0; i < this.todoList.length; i++) {
      if(this.todoList[i].title === todo.title && this.todoList[i].date == todo.date) {
        this.todoService.deleteTodo(i).subscribe((res) => {
          console.log(res);
        })
      }
    }
  }

  addTodo(title: string) {
    this.todoService.postTodo(title).subscribe((res) => {
      console.log(res);
    });
  }




}
