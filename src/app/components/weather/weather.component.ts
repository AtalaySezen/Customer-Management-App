import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  //Weather
  WeatherData: any;
  cityInfo = 'istanbul';

  constructor() { }
  @Input() hideWeather: string = '';
  ngOnInit(): void {
    this.changeCityInfo()

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
    this.WeatherData = {
      main: {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }
  //
  changeCityInfo() {
    let cityName = localStorage.getItem("newCity") || " ";
    if (cityName !== ' ') {
      this.cityInfo = cityName;
    } else if (this.cityInfo == null || undefined || cityName == null || undefined) {
      this.cityInfo === "istanbul";
    }
  }


  getWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityInfo}&appid=5ac25577e127a85829dd2e4d73736bc4`)
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data), console.log(data);
      }).catch(error => {
        this.cityInfo == "istanbul"
        console.log(this.cityInfo);
        console.log("hata")
      })
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }


}
