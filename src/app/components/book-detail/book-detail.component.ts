import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  status =   ['Available', 'Maintenance', 'Loaned', 'Reserved'];
  authors:any = [];

  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private service: BookService,
    private bookService: AuthorService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        title: res['title'],
        author: res['author'],
        summary: res['summary'],
        isbn: res['isbn']
      });
    });
    this.updateForm = this.formBuilder.group({
      title: [''],
      author: [''],
      summary: [''],
      isbn: ['']
    })
  }
  ngOnInit() { 
    this.getAuthors();
  }

  getAuthors(){
    this.bookService.getAllData().subscribe((data) => {
      this.authors = data;
    });
  }
  onUpdate(): any {
    this.service.update(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/admin/books-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
