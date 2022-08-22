import { Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  //Reactive form
  email: string = '';
  password: string = '';
  formCard = new FormGroup({
    username: new FormControl('', [Validators.minLength(5), Validators.email]),
    password: new FormControl('', [Validators.minLength(5)])
  })

  //Login
  login() {
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}

