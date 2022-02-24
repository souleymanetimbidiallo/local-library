import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookinstanceService } from 'src/app/services/bookinstance.service';

@Component({
  selector: 'app-add-bookinstance',
  templateUrl: './add-bookinstance.component.html',
  styleUrls: ['./add-bookinstance.component.scss']
})
export class AddBookinstanceComponent implements OnInit {

  addForm!: FormGroup;
  status =   ['Available', 'Maintenance', 'Loaned', 'Reserved'];
  books:any = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private service: BookinstanceService,
    private bookService: BookService) {
    this.addForm = this.formBuilder.group({
      book: ['', [Validators.required]],
      imprint: ['', [Validators.required]],
      status: [''],
      due_back: ['']
    })
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getAllData().subscribe((data) => {
      this.books = data;
    });
  }
  onSubmit(): any {
    if (!this.addForm.valid) {
      return false;
    } else {
      this.service.add(this.addForm.value)
        .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/admin/bookinstances-list'))
        }, (err) => {
          console.log(err);
        });
    }
  }

}
