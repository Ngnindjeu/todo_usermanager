import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTodoComponent} from "./add-todo/add-todo.component";
import {AppComponent} from "./app.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import { DoneListComponent} from "./done-list/done-list.component";
import { TodoMainComponent } from "./todo-main/todo-main.component";

//Cesar
const routes: Routes = [
  { path: 'new-Entry', component: TodoMainComponent },
  { path: '', component: TodoMainComponent, pathMatch: 'full' },
  { path: 'done', component: DoneListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
