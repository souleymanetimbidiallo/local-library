import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.scss']
})
export class GenreDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  books: any = [];
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private service: GenreService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
      });
    });
    this.updateForm = this.formBuilder.group({
      name: ['']
    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.service.update(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/genres-list'))
      }, (err) => {
        console.log(err);
    });
  }

  readGenre(){
    this.service.getBooksByGenre(this.getId).subscribe((data) => {
      this.books = data;
    });
  }
}
