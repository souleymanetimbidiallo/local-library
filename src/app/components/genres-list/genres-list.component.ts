import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss']
})
export class GenresListComponent implements OnInit {

  genres:any = [];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.readGenre();
  }

  readGenre(){
    this.genreService.getAllData().subscribe((data) => {
      this.genres = data;
    });
  }

  removeGenre(id: any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.genreService.delete(id).subscribe((res) => {
        this.genres.splice(i, 1);
      })
    }
  }
}
