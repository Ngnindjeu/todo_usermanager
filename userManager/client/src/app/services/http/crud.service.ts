import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import { Socket } from 'ngx-socket-io'
import eventTypes from "../../../../../util/events"

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private socket: Socket) {}

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${this.apiUrl}/users`, {});
  }

  async createUser(user: User): Promise<Observable<any>> {
    const response = await this.http.post(`${this.apiUrl}/user`, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
    });

    this.socket.emit('LISTEN_REQUEST_LIST_UPDATE')

    return response;
  }

  deleteUser(id?: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }

  updateUser(user: User): Observable<any> {
    const response =  this.http.put(`${this.apiUrl}/user/${user.id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
    });

    this.socket.emit('LISTEN_USER_EDITED')

    return response
  }
}
