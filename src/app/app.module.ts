import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorService } from './services/author.service';
import { AddGenreComponent } from './components/add-genre/add-genre.component';
import { GenreDetailComponent } from './components/genre-detail/genre-detail.component';
import { GenresListComponent } from './components/genres-list/genres-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookinstancesListComponent } from './components/bookinstances-list/bookinstances-list.component';
import { BookinstanceDetailComponent } from './components/bookinstance-detail/bookinstance-detail.component';
import { AddBookinstanceComponent } from './components/add-bookinstance/add-bookinstance.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthInterceptor } from './interceptors/authconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddAuthorComponent,
    AuthorDetailComponent,
    AuthorsListComponent,
    AddGenreComponent,
    GenreDetailComponent,
    GenresListComponent,
    AddBookComponent,
    BooksListComponent,
    BookDetailComponent,
    BookinstancesListComponent,
    BookinstanceDetailComponent,
    AddBookinstanceComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
