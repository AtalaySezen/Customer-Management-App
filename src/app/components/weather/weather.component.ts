import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('fontSize') === "smallSize") {
      document.querySelectorAll('*').forEach(tags => {
        tags.classList.add('smallSize');
      })
    } else if (localStorage.getItem('fontSize') === "biggerSize") {
      document.querySelectorAll('*').forEach(tags => {
        tags.classList.add('biggerSize');
      })
    } else if (localStorage.getItem('fontFamily') === "lato") {
      document.querySelectorAll('*').forEach(tags => {
        tags.classList.add('lato');
      })
    } else if (localStorage.getItem('fontFamily') === "poppins") {
      document.querySelectorAll('*').forEach(tags => {
        tags.classList.add('poppins');
      })

    } 
  }

}
