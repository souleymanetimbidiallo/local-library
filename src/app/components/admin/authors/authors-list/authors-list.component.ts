import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  authors:any = [];

  constructor(private service: AuthorService) { }

  ngOnInit(): void {
    this.readAuthor();
  }

  readAuthor(){
    this.service.getAllData().subscribe((data) => {
      this.authors = data;
    });
  }

  removeAuthor(id: any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.service.delete(id).subscribe((res) => {
        this.authors.splice(i, 1);
      })
    }
  }

}
