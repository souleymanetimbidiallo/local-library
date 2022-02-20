import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit {

  addForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private service: GenreService) {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
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
          this.ngZone.run(() => this.router.navigateByUrl('/genres-list'))
        }, (err) => {
          console.log(err);
        });
    }
  }

}
