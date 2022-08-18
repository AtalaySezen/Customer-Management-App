import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
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

  email: string = '';
  password: string = '';
  formCard = new FormGroup({
    username: new FormControl('username', [Validators.minLength(5), Validators.email]),
    password: new FormControl('surname', [Validators.minLength(5)])
  })


  login() {
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}

