import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { IUserReturn, IUsuario } from '../component/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/user'
  constructor(private httpClient: HttpClient, private router: Router) { }

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
 });

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(usuario: IUsuario): Observable<IUsuario> {
    console.log(usuario)
    const res = this.httpClient.post<IUsuario>(this.apiUrl + "/user", usuario).pipe(
      tap((resposta) => {
        console.log(resposta)
        // if(!resposta){
        //   this.isLoggedIn = false;
        // } else {
        //   localStorage.setItem('usuario', JSON.stringify(resposta));
        //   this.isLoggedIn = true;
        // }

      }))

      return res
  }


  signup(usuario: IUsuario): Observable<IUserReturn> {
    const res = this.httpClient.post<IUserReturn>(this.apiUrl + "/create", usuario).pipe(
      tap((resposta) => {
        console.log(resposta)
        // if(!resposta){
        //   this.isLoggedIn = false;
        // } else {
        //   localStorage.setItem('usuario', JSON.stringify(resposta));
        //   this.isLoggedIn = true;
        // }

      }))

      return res
  }


  getUser(): string | IUsuario | null{
    return localStorage.getItem('usuario');
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
