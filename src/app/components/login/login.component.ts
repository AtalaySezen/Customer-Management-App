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

  // formCard = new FormGroup({
  //   email:new FormControl('',[Validators.minLength(2),Validators.email,Validators.required]),
  //   password:new FormControl('',[Validators.minLength(5),Validators.required])
  // })

  email: string = '';
  password: string = '';
  
  formCard = new FormGroup({
    username:new FormControl('username',[Validators.minLength(5),Validators.email]),
    surname:new FormControl('surname',[Validators.minLength(5)])
  })


  login() {
    if (this.email == '' && this.password == '') {
      alert("hata")
      return;
    }


    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}

