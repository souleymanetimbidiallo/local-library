import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  allstatus = ["admin", "subscriber", "authenticated"];
  image!:File;
  avatarUrl!:string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private service: AuthService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res.msg['name'],
        email: res.msg['email'],
        status: res.msg['status'],

      });
      this.avatarUrl =  res.msg['avatar'];
      console.log(this.avatarUrl);
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      email: [''],
      status: ['']
    })
  }
  ngOnInit() { }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.image = file;
    }
  }

  onUpdate(): any {

    let formData = new FormData();
    formData.append('name', this.updateForm.value.name);
    formData.append('email', this.updateForm.value.email);
    formData.append('status', this.updateForm.value.status);
    formData.append('image', this.image);

    this.service.update(this.getId, formData)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user-profile/'+this.getId))
      }, (err) => {
        console.log(err);
    });
  }
}
