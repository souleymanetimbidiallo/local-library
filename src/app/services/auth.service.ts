import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User = new User();

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(private http: HttpClient, public router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  signup(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/signup`, user)
      .subscribe((res: any) => {
        if (res.message) {
          this.router.navigate(['auth/login']);
        }
      });
  }


  // Login
  login(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          let currUser: User = {
            _id: res.msg._id,
            name: res.msg.name,
            email: res.msg.email,
            status: res.msg.status
          };
          localStorage.setItem('currentUser', JSON.stringify(currUser));
          this.userSubject.next(currUser);
          this.router.navigate(['user-profile/' + res.msg._id]);
        });
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  get isAuthorized(): boolean {
    return (this.isLoggedIn && this.userValue.status == 'admin');
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeCurrentUser = localStorage.removeItem('currentUser');
    if (removeToken == null && removeCurrentUser==null) {
      this.router.navigate(['auth/login']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //GET ALL USERS
  getAllData() {
    return this.http.get(`${this.endpoint}/users`);
  }

  //GET SINGLE USER
  getSingleData(id: any): Observable<any> {
    let url = `${this.endpoint}/users/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //UPDATE USER
  update(id: any, data: any): Observable<any> {
    let url = `${this.endpoint}/users/${id}`;
    return this.http
      .put(url, data)
      .pipe(catchError(this.handleError));
  }

  //DELETE USER
  delete(id: any): Observable<any> {
    let url = `${this.endpoint}/users/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.handleError));
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
