import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  image!: File;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      status: ['subscriber'],
      image: [''],
    });
  }
  ngOnInit() {}

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.image = file;
    }
  }

  registerUser() {
    const formData = new FormData();
    formData.append('name', this.signupForm.value.name);
    formData.append('email', this.signupForm.value.email);
    formData.append('password', this.signupForm.value.password);
    formData.append('status', this.signupForm.value.status);
    formData.append('image', this.image);
    this.authService.signup(formData);

    //this.signupForm.reset()
  }
}
