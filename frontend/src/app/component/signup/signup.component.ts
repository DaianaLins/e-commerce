import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IUsuario } from '../../interfaces/Login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  body = "body";
  container = "container";
  email = "email";
  emailInput = "emailInput";
  email_l: string = '';
  nome: string = '';
  password: string = '';
  showErr:boolean = false;
  showErrAut:boolean = false;
  form = "form";

  message: string = '';

  constructor(public authService: AuthService, public router: Router) {
  }


  signup() {
    if (this.nome != '' && this.email_l != '' && this.password != '') {
    var usuario = {'name': this.nome, 'email': this.email_l, 'password': this.password} as IUsuario;
    this.authService.signup(usuario).subscribe((res) => {
      alert(res.msg)
      const redirectUrl = 'login';
      this.router.navigate([redirectUrl]);
    },
    err =>{
      alert(err.error.detail)
    });
  }else{
    this.message = 'Preencha todos os campos *'
  }
}

}
