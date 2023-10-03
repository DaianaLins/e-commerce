import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ICategories } from 'src/app/interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8000/category'
  constructor(private httpClient: HttpClient, private router: Router) { }

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  });

  getAllCategories(): Observable<ICategories[]>{
    const res = this.httpClient.get<ICategories[]>(this.apiUrl + "/", {headers: this.reqHeader}).pipe(
      tap((resposta) => {
        return resposta
      })
      )

      return res
  }

  async createCategory(category: ICategories): Promise<Observable<ICategories[]>> {
    const res = await this.httpClient.post<ICategories[]>(this.apiUrl + "/create", category,  {headers: this.reqHeader}).pipe(
      tap((resposta) => {
        if(!resposta){
        }

      }))

      return res
  }

  async editCategory(category: ICategories): Promise<Observable<ICategories[]>> {
    const res = await this.httpClient.put<ICategories[]>(this.apiUrl + `/${category.id}`, category,  {headers: this.reqHeader}).pipe(
      tap((resposta) => {
        if(!resposta){
        }

      }))

      return res
  }

  deleteCategory(id: string): Observable<ICategories[]> {

    const res = this.httpClient.delete<ICategories[]>(this.apiUrl + `/${id}`, {headers: this.reqHeader}).pipe(
      tap((resposta) => {
        if(!resposta){

        }

      }))

      return res
  }
}
