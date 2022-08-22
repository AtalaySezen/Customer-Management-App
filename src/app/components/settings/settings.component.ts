import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

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

  smallSize(): void {
    document.querySelectorAll('*').forEach(tags => {
      tags.classList.remove('biggerSize');
      tags.classList.add('smallSize');
    });
    localStorage.setItem('fontSize', 'smallSize');
  }

  defaultSize() {
    document.querySelectorAll('*').forEach(tags => {
      tags.classList.remove('smallSize');
      tags.classList.remove('biggerSize');
    });
    localStorage.removeItem('fontSize');
  }
  mobile: boolean = false;
  biggerSize() {
    if (window.innerWidth > 900) {
      document.querySelectorAll('*').forEach(tags => {
        tags.classList.add('biggerSize');
        localStorage.setItem('fontSize', 'biggerSize');
      })
    } else {
      alert("Mobil uyumluluk için, Mobil cihazlarda bu özellik devre dışı!")
      this.mobile = true;
    }
  }

  //Font Change
  poppinsFont() {
    document.querySelectorAll('*').forEach(tags => {
      tags.classList.add('poppins');
      localStorage.setItem('fontFamily', 'poppins');
    })

  }
  robotoFont() {
    document.querySelectorAll('*').forEach(tags => {
      tags.classList.remove('poppins');
      tags.classList.remove('lato');
      localStorage.removeItem('fontFamily');
    })
  }
  latoFont() {
    document.querySelectorAll('*').forEach(tags => {
      tags.classList.add('lato');
      localStorage.setItem('fontFamily', 'lato');
    })
  }
  //Weather City

  changeCity(){
    
  }
}
