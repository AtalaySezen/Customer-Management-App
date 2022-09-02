import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from '@angular/fire/auth'
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
      this.router.navigate(['/login']);
      if (email != '' || password != '') {
        alert("yanlış"); //Hata toastrları eklenecek.
      } else {
        alert("hatalı")
      }
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

  //getuserdata
  getUserData() {
    // console.log(this.fireAuth.authState.forEach(e=>{
    //   e?.providerId
    // }))
    // console.log(this.fireAuth.currentUser);
    // console.log(this.fireAuth.authState)
  }

  //Sign out; 
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token'); //sadecetoken burada silinsin.
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  //Google ile giriş
  googleSignIn() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    }, err => {
      alert(err.message)
    })
  }

  //Login Routing
  loginRouter() {
    if (localStorage.getItem('token') == 'true') {
      return true
    } else {
      return false;
    }
  }



}