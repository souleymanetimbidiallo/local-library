import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User = new User();
  CurrentUserId!:string
  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }
  // Sign-up
  /*signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }*/
  

  signup(user: User) {
    return this.http.post<any>(`${this.endpoint}/signup`, user)
      .subscribe((res: any) => {
        if (res.message) {
          this.router.navigate(['auth/login']);
        }
      })
  }

  // Login
  login(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          //this.currentUser = res;
          this.currentUser._id = res.msg._id;
          this.CurrentUserId = res.msg._id;
          this.currentUser.email = res.msg.email;
          this.currentUser.name = res.msg.name;
          this.currentUser.password = res.msg.password;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })
      })
  }
  getUserId(){
    return this.currentUser._id;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['auth/login']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}