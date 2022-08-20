import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {

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
