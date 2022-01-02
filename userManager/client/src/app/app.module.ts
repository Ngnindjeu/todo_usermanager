import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { AppComponent } from './app.component';
import { UserCardListComponent } from './components/user-card-list/user-card-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth/auth.service';

const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {}
}
@NgModule({
  declarations: [
    AppComponent,
    UserCardListComponent,
    AddUserComponent,
    EditUserComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
