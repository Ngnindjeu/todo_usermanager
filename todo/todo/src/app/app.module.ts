import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DoneListComponent } from './done-list/done-list.component';
import { TodoMainComponent } from './todo-main/todo-main.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import {CustomDatePipe} from './custom.datepipe';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AddTodoComponent,
    DoneListComponent,
    TodoMainComponent,
    TodoHeaderComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

  ],
  providers: [ NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
