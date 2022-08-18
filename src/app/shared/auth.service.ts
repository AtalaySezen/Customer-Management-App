import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider} from '@angular/fire/auth'
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

  //Google ile giriş
  googleSignIn(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res=>{
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid))
    },err=>{
      alert(err.message)
    })
  }





}
