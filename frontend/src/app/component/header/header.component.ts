import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../../interfaces/Login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  content = 'content'
  container= 'container'
  container2= 'container2'

  user: IUser;


  constructor(public authService: AuthService, public router: Router) {
    this.user = this.getUser();
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') as string) as IUser;
  }
}
