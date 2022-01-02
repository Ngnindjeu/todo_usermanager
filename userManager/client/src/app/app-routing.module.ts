import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCardListComponent} from "./components/user-card-list/user-card-list.component";
import {AddUserComponent} from "./components/add-user/add-user.component";

const routes: Routes = [
  {path: '', component: UserCardListComponent},
  {path: 'add', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
