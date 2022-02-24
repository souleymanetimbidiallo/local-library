import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { UserProfileComponent } from "./auth/user-profile/user-profile.component";
import { AddAuthorComponent } from "./components/add-author/add-author.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { AddBookinstanceComponent } from "./components/add-bookinstance/add-bookinstance.component";
import { AddGenreComponent } from "./components/add-genre/add-genre.component";
import { AuthorDetailComponent } from "./components/author-detail/author-detail.component";
import { AuthorsListComponent } from "./components/authors-list/authors-list.component";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";
import { BookinstanceDetailComponent } from "./components/bookinstance-detail/bookinstance-detail.component";
import { BookinstancesListComponent } from "./components/bookinstances-list/bookinstances-list.component";
import { BooksListComponent } from "./components/books-list/books-list.component";
import { GenreDetailComponent } from "./components/genre-detail/genre-detail.component";
import { GenresListComponent } from "./components/genres-list/genres-list.component";
import { DashComponent } from "./dash/dash.component";
import { AuthGuard } from "./services/auth.guard";



const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

    /*author routes */
    { path: 'admin/authors-list', component: AuthorsListComponent, canActivate: [AuthGuard] },
    { path: 'admin/add-author', component: AddAuthorComponent, canActivate: [AuthGuard] },
    { path: 'admin/edit-author/:id', component: AuthorDetailComponent, canActivate: [AuthGuard] },

    /*genre routes */
    { path: 'admin/genres-list', component: GenresListComponent, canActivate: [AuthGuard] },
    { path: 'admin/add-genre', component: AddGenreComponent, canActivate: [AuthGuard] },
    { path: 'admin/edit-genre/:id', component: GenreDetailComponent, canActivate: [AuthGuard] },

    /*book routes */
    { path: 'admin/books-list', component: BooksListComponent, canActivate: [AuthGuard] },
    { path: 'admin/add-book', component: AddBookComponent, canActivate: [AuthGuard] },
    { path: 'admin/edit-book/:id', component: BookDetailComponent, canActivate: [AuthGuard] },

    /*bookinstance routes */
    { path: 'admin/bookinstances-list', component: BookinstancesListComponent, canActivate: [AuthGuard] },
    { path: 'admin/add-bookinstance', component: AddBookinstanceComponent, canActivate: [AuthGuard] },
    { path: 'admin/edit-bookinstance/:id', component: BookinstanceDetailComponent, canActivate: [AuthGuard] },



    /*auth routes */
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/signup', component: SignupComponent },
    { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },

    /* admin routes */
    { path: 'dashboard', component: DashComponent },



];

@NgModule({
    imports: [CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }