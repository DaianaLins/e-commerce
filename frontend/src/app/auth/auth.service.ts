import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { IUser, IUserReturn, IUsuario } from '../interfaces/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/user'
  constructor(private httpClient: HttpClient, private router: Router) { }

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
 });

  isLoggedIn = false;


  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(usuario: IUsuario): Observable<IUserReturn> {
    const res = this.httpClient.post<IUserReturn>(this.apiUrl + "/token", usuario).pipe(
      tap((resposta) => {

      }
  ))

      return res
    }

  async auth_token() : Promise<Observable<IUser>>{
    const res = await this.httpClient.get<IUser>(this.apiUrl + "/me", {headers: this.reqHeader}).pipe(
      tap((resposta) => {
        // if(!resposta){
          //   this.isLoggedIn = false;
        // } else {
        //   localStorage.setItem('usuario', JSON.stringify(resposta));
        //   this.isLoggedIn = true;
        // }

      }
  ))

      return res
  }


  signup(usuario: IUsuario): Observable<IUserReturn> {
    const res = this.httpClient.post<IUserReturn>(this.apiUrl + "/create", usuario).pipe(
      tap((resposta) => {

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
