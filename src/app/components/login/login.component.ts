import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  email: string = '';
  password: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.minLength(5), Validators.email,Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(5)])
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

