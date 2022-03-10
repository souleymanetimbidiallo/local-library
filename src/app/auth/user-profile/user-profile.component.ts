import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User = new User();
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser._id = res.msg._id;
      this.currentUser.email= res.msg.email;
      this.currentUser.name = res.msg.name;
      this.currentUser.password= res.msg.password;
      this.currentUser.avatar= res.msg.avatar;
    })
  }
  ngOnInit() { }

}
