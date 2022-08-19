import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';
@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private AuthService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.AuthService.loginRouter()) {
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
    
  }
  
}
