import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToDoEntry} from "./TodoEntry";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly ROOT_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {

  }

  public getTodos(): Observable<any> {
     return  this.http.get<any>(this.ROOT_URL + 'todolist');
  }

  public postTodo(title: string){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
   return this.http.post(this.ROOT_URL + 'entry',{title},{headers});
  }

 public markAsDone(id: number):Observable<any> {

  return  this.http.put(`${this.ROOT_URL}done/${id}`, {});

 }
  public markAsUnDone(id: number):Observable<any> {

    return  this.http.put(`${this.ROOT_URL}undone/${id}`, {});

  }

  deleteTodo (id: number):Observable<any> {
   return  this.http.delete(this.ROOT_URL + `entry/${id}`);
  }


}
