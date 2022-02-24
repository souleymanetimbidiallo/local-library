import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Author } from '../models/author';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUri: string = 'http://localhost:3000/api/catalog/authors';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  //CREATE AUTHOR:
  add(data: Author): Observable<any> {
    return this.http.post(this.baseUri, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  //GET ALL AUTHORS
  getAllData(){
    return this.http.get(`${this.baseUri}`);
  }

  //GET SINGLE AUTHOR
  getSingleData(id: any): Observable<any>{
    let url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.httpHeaders})
    .pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //UPDATE AUTHOR
  update(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  //DELETE AUTHOR
  delete(id:any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.delete(url, { headers: this.httpHeaders }).pipe(
        catchError(this.handleError)
      )
  }

  // ERROR HANDLING
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
