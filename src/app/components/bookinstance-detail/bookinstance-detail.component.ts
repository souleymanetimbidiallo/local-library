import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookinstanceService } from 'src/app/services/bookinstance.service';

@Component({
  selector: 'app-bookinstance-detail',
  templateUrl: './bookinstance-detail.component.html',
  styleUrls: ['./bookinstance-detail.component.scss']
})
export class BookinstanceDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  status =   ['Available', 'Maintenance', 'Loaned', 'Reserved'];
  books:any = [];

  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private service: BookinstanceService,
    private bookService: BookService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        book: res['book'],
        imprint: res['imprint'],
        status: res['status'],
        due_back: res['due_back']
      });
    });
    this.updateForm = this.formBuilder.group({
      book: [''],
      imprint: [''],
      status: [''],
      due_back: ['']
    })
  }
  ngOnInit() { 
    this.getBooks();
  }

  getBooks(){
    this.bookService.getAllData().subscribe((data) => {
      this.books = data;
    });
  }
  onUpdate(): any {
    this.service.update(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/admin/bookinstances-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
