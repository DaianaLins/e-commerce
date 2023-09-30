import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  body = "body";
  container = "container";
  form = "form";
  form2 = "form2";
  email = "email";
  emailInput = "emailInput";
  email_l: string = '';
  password: string = '';
  showErr:boolean = false;
  showErrAut:boolean = false;


  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  logar() {
    this.message = 'Trying to log in ...';
    var usuario = {'email': this.email_l, 'password': this.password} as IUsuario;
    this.authService.login(usuario).subscribe((res) => {
      this.message = this.getMessage();
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token)
        this.authService.auth_token().then((res)=>{
          res.pipe().subscribe((res)=>{
            console.log({res})
            localStorage.setItem('user', JSON.stringify(res))
            const redirectUrl = 'home';
            this.router.navigate([redirectUrl]);
          })
        })
      } else{
        alert(res['msg']?.valueOf())
      }
    });
  }

}
