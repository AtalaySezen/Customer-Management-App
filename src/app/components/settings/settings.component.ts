import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  //Fonts
  mobile: boolean = false;
  //Weather 
  cityName: string = '';
  cityComponentName: string = '';
  //Hide Weather Widget
  hideWeather = '';
  //Auto logout
  disableButton: boolean = false;
  //App name change
  appName: string = '';
  newAppName: string = '';


  ngOnInit(): void {
    this.autoLocalStorageOut();
    this.hideWeatherStorage();
  }

  //Fontsize change
  smallSize() {
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

  //Fonts Change
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

  changeCity() {
    if (this.cityName === "") {
      alert("boş")
      return false;
    }
    else if (confirm("ok?") == true) {
      console.log(this.cityName);
      localStorage.setItem("newCity", this.cityName);
      window.location.reload();
      return true;
    } else {
      return false;
    }
  }

  //Hide Weather Widget
  hideText: string = 'Hide Weather Widget';
  hideWeatherWidget() {
    if (this.hideWeather == '') {
      this.hideWeather = 'none';
      this.hideText = "Show Weather Widget"
      localStorage.setItem("hideWeatherWidget", "hide");
    } else if (this.hideWeather == 'none') {
      this.hideWeather = '';
      this.hideText = 'Hide Weather Widget';
      localStorage.removeItem("hideWeatherWidget");
    }
  }
  
  hideWeatherStorage() {
    if (localStorage.getItem("hideWeatherWidget") == "hide") {
      this.hideWeather = 'none';
    }
  }

  //Clear localStorage
  clearCache() {
    if (confirm("All Settings Were Reset To Default Values") == true) {
      localStorage.removeItem("newCity");
      localStorage.removeItem("darkMode");
      localStorage.removeItem("fontSize");
      localStorage.removeItem("fontFamily");
      localStorage.removeItem("autoOut");
      localStorage.removeItem("hideWeatherWidget");
      window.location.reload();
      return true;
    } else {
      return false
    }
  }

  autoOut() {
    let confirmAutoLogOut = confirm("uygulama 30 dakika sonra kapanacak onaylıyor musun?Bu onaydan sonra tekrar geri dönüş yok!")
    if (confirmAutoLogOut == true) {
      localStorage.setItem("autoOut", "true");
      setTimeout(() => {
        if (localStorage.getItem("autoOut") == "true") {
          this.autoLogOut()
        }
      }, 30 * 60 * 1000);
      return true;
    } else {
      return false;
    }
  }

  //import logout from auth.service
  autoLogOut() {
    this.authService.logout()
  }

  //Auto logout if user select 
  autoLocalStorageOut() {
    let localAutoLog = localStorage.getItem("autoOut");
    setTimeout(() => {
      if (localAutoLog === "true") {
        this.autoLogOut();
      }
    }, 30 * 60 * 1000);
  }

  //App name change
  changeAppName() {
    this.appName = this.newAppName;
    localStorage.setItem("newAppName", this.newAppName);
  }





}
