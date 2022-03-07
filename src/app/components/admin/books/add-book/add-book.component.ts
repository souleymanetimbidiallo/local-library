import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addForm!: FormGroup;
  authors:any = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private service: BookService,
    private authorService: AuthorService) {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      summary: [''],
      isbn: ['']
    })
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    this.authorService.getAllData().subscribe((data) => {
      this.authors = data;
    });
  }
  onSubmit(): any {
    if (!this.addForm.valid) {
      return false;
    } else {
      this.service.add(this.addForm.value)
        .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/admin/books-list'))
        }, (err) => {
          console.log(err);
        });
    }
  }

}
