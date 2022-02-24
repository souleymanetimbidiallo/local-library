import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {
  addForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private service: AuthorService) {
    this.addForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      date_of_birth: [''],
      date_of_death: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    if (!this.addForm.valid) {
      return false;
    } else {
      this.service.add(this.addForm.value)
        .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/admin//authors-list'))
        }, (err) => {
          console.log(err);
        });
    }
  }

}
