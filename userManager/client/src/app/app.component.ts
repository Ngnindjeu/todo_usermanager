import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './models/user';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  user: User = {
    username: 'admin',
    password: 'admin'
  }

  isLoggedIn: boolean;

  constructor(
    public authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(({
      next: data => {
        if ((<any>data).user) this.isLoggedIn = true;
        else this.isLoggedIn = false;
      },
      error: err => {
        this.isLoggedIn = false;
      }
    }))
  }


 loginUser() {
    this.authService.loginUser(this.user).subscribe({
      next: (data: Response) => {
        if ((<any>data).user) {
          this.isLoggedIn = true;
          this.router.navigate(['']);
        } else {
          this.isLoggedIn = false;
        }
      },
      error: err => {
        this.isLoggedIn = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            window.alert('Username oder Password ist ungültig!');
          }
        }
      }
    });
  }


  logoutUser(): void {
    this.authService.logoutUser().subscribe(({
      next: data => {
        this.isLoggedIn = false;
        this.router.navigate(['']);
      },
      error: err => {
        console.error('There was an error!', err);
      }
    }));
  }
}
