import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUri: string = 'http://localhost:3000/api/catalog/books';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  //CREATE BOOK
  add(data: Book): Observable<any> {
    return this.http.post(this.baseUri, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  //GET ALL BOOKS
  getAllData(){
    return this.http.get(`${this.baseUri}`);
  }

  //GET SINGLE BOOK
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


  //UPDATE BOOK
  update(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  //DELETE BOOK
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
