import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) { }

  //DarkMode Icon
  darkMode: boolean = false;
  lightMode = '';
  navDark = '';
  color = 'primary';
  //Show tool tips for user
  toolShow = 'tooltiptext'
  
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
    //tool tips for user
    this.showTools();

  }

  //Show tools
  showTools() {
    if (localStorage.getItem("toolShow") != "true") {
      this.toolShow = 'visibleTool';
      //Hide auto
      setTimeout(() => {
        this.toolShow = 'tooltiptext';
      }, 3000);
      localStorage.setItem("toolShow", "true");
    } else if (localStorage.getItem("toolShow") == "true") {
      this.toolShow == 'tooltiptext'
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
  
  //DarkMode
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


