import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  isLoggedIn(): Observable<any> {
    return this.http.get<any>(`${this.url}/login`);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, user);
  }

  logoutUser(): Observable<any> {
    return this.http.post<any>(`${this.url}/logout`, {});
  }
}
