import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users:any = [];
  currentUser!:User;

  constructor(private service: AuthService) { }
  ngOnInit(): void {
    this.read();
  }


  read(){
    this.service.getAllData().subscribe((data) => {
      this.users = data;
    });
  }

  remove(id: any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.service.delete(id).subscribe((res) => {
        this.users.splice(i, 1);
      })
    }
  }
}
