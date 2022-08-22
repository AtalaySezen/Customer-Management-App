import { Component, OnInit} from '@angular/core';
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
  toggleSwith: boolean = false;
  disableButton: boolean = false;


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
    this.autoLocalStorageOut();
    this.hideWeatherStorage();
  }

  //Fontsize change
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
  hideWeatherWidget() {
    if (this.hideWeather == '') {
      this.hideWeather = 'none';
      localStorage.setItem("hideWeatherWidget", "hide");
    } else if (this.hideWeather == 'none') {
      this.hideWeather = '';
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
    if (confirm("tüm ayarlar silenecek ve sayfa yenilenecektir.") == true) {
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

  //Auto logout
  autoOut() {
    let confirmAutoLogOut = confirm("uygulama 30 dakika sonra kapanacak onaylıyor musun?Bu onaydan sonra tekrar geri dönüş yok!")
    if (confirmAutoLogOut == true) {
      this.toggleSwith = !this.toggleSwith
      this.disableButton = true;
      localStorage.setItem("autoOut", "true");
    }
    setTimeout(() => {
      if (this.toggleSwith == true) {
        console.log(this.toggleSwith)
        this.autoLogOut()
      }
    }, 30 * 60 * 1000);
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







}
