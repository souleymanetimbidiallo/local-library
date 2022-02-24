import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AppRoutingModule } from './app-routing.module';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
    NavComponent,
    DashComponent,
    MiniCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
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
