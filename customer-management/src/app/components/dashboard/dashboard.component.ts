import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }
  lightMode = '';
  navDark = '';
  //DarkMode Icon
  darkMode: boolean = false;
  ngOnInit(): void {
    let darkMode = localStorage.getItem('darkMode');
    console.log(darkMode)
    if (darkMode === "true") {
      document.body.classList.add("dark-theme");
      this.lightMode = 'white';
      this.navDark = 'navBlack';
    } else {
      document.body.classList.remove("dark-theme");
      this.lightMode = ''
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
