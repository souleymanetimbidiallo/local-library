import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddAuthorComponent } from './components/admin/authors/add-author/add-author.component';
import { AuthorDetailComponent } from './components/admin/authors/author-detail/author-detail.component';
import { AuthorsListComponent } from './components/admin/authors/authors-list/authors-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AddGenreComponent } from './components/admin/genres/add-genre/add-genre.component';
import { AddBookComponent } from './components/admin/books/add-book/add-book.component';
import { BookDetailComponent } from './components/admin/books/book-detail/book-detail.component';
import { AddBookinstanceComponent } from './components/admin/bookinstances/add-bookinstance/add-bookinstance.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthInterceptor } from './interceptors/authconfig.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './components/front/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { GenreDetailComponent } from './components/admin/genres/genre-detail/genre-detail.component';
import { GenresListComponent } from './components/admin/genres/genres-list/genres-list.component';
import { BooksListComponent } from './components/admin/books/books-list/books-list.component';
import { BookinstancesListComponent } from './components/admin/bookinstances/bookinstances-list/bookinstances-list.component';
import { BookinstanceDetailComponent } from './components/admin/bookinstances/bookinstance-detail/bookinstance-detail.component';

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
    HomeComponent,
    DashboardComponent,
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
