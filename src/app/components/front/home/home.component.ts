import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

}
