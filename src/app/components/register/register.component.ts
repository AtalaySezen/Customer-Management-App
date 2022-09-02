import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  //Validation
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.minLength(5), Validators.email]),
    password: new FormControl('', [Validators.minLength(5)])
  })

  //Register
  register() {
    if (this.email == '') {
      return;
    }
    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }
 






}
