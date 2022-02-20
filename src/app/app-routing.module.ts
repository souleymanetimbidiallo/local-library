import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/'},
    {path: 'authors-list', component: AuthorsListComponent},
    { path: 'add-author', component: AddAuthorComponent},
    { path: 'edit-author/:id', component: AuthorDetailComponent},
    {path: 'genres-list', component: GenresListComponent},
    { path: 'add-genre', component: AddGenreComponent},
    { path: 'edit-genre/:id', component: GenreDetailComponent},
    {path: 'books-list', component: BooksListComponent},
    { path: 'add-book', component: AddBookComponent},
    { path: 'edit-book/:id', component: BookDetailComponent},
    {path: 'bookinstances-list', component: BookinstancesListComponent},
    { path: 'add-bookinstance', component: AddBookinstanceComponent},
    { path: 'edit-bookinstance/:id', component: BookinstanceDetailComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}