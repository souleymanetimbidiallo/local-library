import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books:any = [];

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.read();
  }

  read(){
    this.service.getAllData().subscribe((data) => {
      this.books = data;
    });
  }

  remove(id: any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.service.delete(id).subscribe((res) => {
        this.books.splice(i, 1);
      })
    }
  }
}
