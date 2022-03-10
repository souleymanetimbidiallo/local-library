import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Book } from './../../../models/book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {
  getId: any;
  bookingForm!: FormGroup;
  status =   ['Available', 'Maintenance', 'Loaned', 'Reserved'];
  authors:any = [];
  currentBook!:any;
  currentUser!:any;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private service: BookService,
    private authorService: AuthorService,
    private authService: AuthService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getId).subscribe(res => {
        this.currentBook = res
    });
    this.bookingForm = this.formBuilder.group({
      title: [''],
      author: [''],
      summary: [''],
      isbn: ['']
    })
  }
  ngOnInit() {
    this.getCurrentUser();
    this.getAuthors();
  }

  getAuthors(){
    this.authorService.getAllData().subscribe((data) => {
      this.authors = data;
    });
  }

  getCurrentUser(){
    this.currentUser = this.authService.userValue;
  }
  onUpdate(): any {
    this.service.update(this.getId, this.bookingForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/admin/books-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
