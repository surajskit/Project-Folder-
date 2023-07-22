import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
    const movieListItems = document.getElementsByClassName('flex-column');
    for (let i = 0; i < movieListItems.length; i++) {
      movieListItems[i].addEventListener('click', () => {
        const movieName = movieListItems[i].querySelector('h6')!.innerText;
        localStorage.setItem('MovieName', movieName);
      });
    }
  }
}




