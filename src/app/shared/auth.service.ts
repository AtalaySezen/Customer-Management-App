import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
  //Login sistemi:
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true'); //Token
      this.router.navigate(['dashboard']);
    }, err => {
      alert("Hata var")
      this.router.navigate(['/login']);
    })
  }
  //Register function
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("başarılı bir şekilde kayıt oluşturuldu");
      this.router.navigate(['/login']);
    }, err => {
      alert("hata");
      this.router.navigate(['/register']);
    })
  }

  //Sign out; 
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token'); //token burada silinsin.
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })

  }






}
