import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private service: AuthorService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        first_name: res['first_name'],
        family_name: res['family_name'],
        date_of_birth: res['date_of_birth'],
        date_of_death: res['date_of_death']
      });
    });
    this.updateForm = this.formBuilder.group({
      first_name: [''],
      family_name: [''],
      date_of_birth: [''],
      date_of_death: ['']
    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.service.update(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/admin/authors-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
