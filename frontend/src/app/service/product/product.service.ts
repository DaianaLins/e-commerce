import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/product'
  constructor(private httpClient: HttpClient, private router: Router) { }

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  });

  getAllProducts(): Observable<IProduct[]>{
    const res = this.httpClient.get<IProduct[]>(this.apiUrl + "/", {headers: this.reqHeader}).pipe(
      tap((resposta) => {
        return resposta
      })
      )

      return res
  }

}
