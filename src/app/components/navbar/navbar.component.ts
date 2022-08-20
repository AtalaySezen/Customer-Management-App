import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) { }
  lightMode = '';
  navDark = '';

  //DarkMode Icon
  darkMode: boolean = false;
  ngOnInit(): void {
    let darkMode = localStorage.getItem('darkMode');
    if (darkMode === "true") {
      document.body.classList.add("dark-theme");
      this.lightMode = 'white';
      this.navDark = 'navBlack';
      this.darkMode = true;
    } else {
      document.body.classList.remove("dark-theme");
      this.lightMode = ''
      this.darkMode = false;
    }
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

  
  //DarkMode
  enableDarkMode() {
    document.body.classList.add("dark-theme");
    localStorage.setItem("darkMode", "true");
    this.lightMode = 'white';
    this.navDark = 'navBlack';
    this.darkMode = true;
  }
  disableDarkMode() {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("darkMode", "false");
    this.lightMode = ''
    this.navDark = '';
    this.darkMode = false;
  }

  //Logout
  register() {
    this.auth.logout();
  }


}
