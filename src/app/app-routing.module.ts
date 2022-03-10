import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

import { HomeComponent } from './components/front/home/home.component';
import { AuthGuard } from './services/auth.guard';

import { AddAuthorComponent } from './components/admin/authors/add-author/add-author.component';
import { AddBookComponent } from './components/admin/books/add-book/add-book.component';
import { AddBookinstanceComponent } from './components/admin/bookinstances/add-bookinstance/add-bookinstance.component';
import { AddGenreComponent } from './components/admin/genres/add-genre/add-genre.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthorDetailComponent } from './components/admin/authors/author-detail/author-detail.component';
import { AuthorsListComponent } from './components/admin/authors/authors-list/authors-list.component';
import { BookDetailComponent } from './components/admin/books/book-detail/book-detail.component';
import { GenresListComponent } from './components/admin/genres/genres-list/genres-list.component';
import { GenreDetailComponent } from './components/admin/genres/genre-detail/genre-detail.component';
import { BooksListComponent } from './components/admin/books/books-list/books-list.component';
import { BookinstancesListComponent } from './components/admin/bookinstances/bookinstances-list/bookinstances-list.component';
import { BookinstanceDetailComponent } from './components/admin/bookinstances/bookinstance-detail/bookinstance-detail.component';
import { UsersListComponent } from './auth/users-list/users-list.component';
import { EditUserComponent } from './auth/edit-user/edit-user.component';
import { BookingPageComponent } from './components/front/booking-page/booking-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    /* admin routes */
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
      },

      /*author routes */
      {
        path: 'authors-list',
        component: AuthorsListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-author',
        component: AddAuthorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-author/:id',
        component: AuthorDetailComponent,
        canActivate: [AuthGuard],
      },

      /*genre routes */
      {
        path: 'genres-list',
        component: GenresListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-genre',
        component: AddGenreComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-genre/:id',
        component: GenreDetailComponent,
        canActivate: [AuthGuard],
      },

      /*book routes */
      {
        path: 'books-list',
        component: BooksListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-book',
        component: AddBookComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-book/:id',
        component: BookDetailComponent,
        canActivate: [AuthGuard],
      },

      /*bookinstance routes */
      {
        path: 'bookinstances-list',
        component: BookinstancesListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-bookinstance',
        component: AddBookinstanceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-bookinstance/:id',
        component: BookinstanceDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'auth',
    children: [
      /*auth routes */
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },

  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },

  { path: 'home', component: HomeComponent },
  { path: 'booking/:id', component: BookingPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
