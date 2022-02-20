import { Component, OnInit } from '@angular/core';
import { BookinstanceService } from 'src/app/services/bookinstance.service';

@Component({
  selector: 'app-bookinstances-list',
  templateUrl: './bookinstances-list.component.html',
  styleUrls: ['./bookinstances-list.component.scss']
})
export class BookinstancesListComponent implements OnInit {

  bookinstances:any = [];

  constructor(private service: BookinstanceService) { }

  ngOnInit(): void {
    this.read();
  }

  read(){
    this.service.getAllData().subscribe((data) => {
      this.bookinstances = data;
    });
  }

  remove(id: any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.service.delete(id).subscribe((res) => {
        this.bookinstances.splice(i, 1);
      })
    }
  }
}
