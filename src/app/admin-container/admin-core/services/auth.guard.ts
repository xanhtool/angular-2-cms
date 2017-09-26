import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(
    private afAuth: AngularFireAuth,
    public authService:AuthService,
    public router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .map(authenticated => {
        if (authenticated && state.url == "/login") {
          this.router.navigate(['admin'])
          return false 
        }
        else if (!authenticated && state.url != "/login") {
          this.router.navigate(['login'])
          return false
        } else {
          return true
        }
      })
      ;
  }

  canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .map(authenticated => {
        if (authenticated && state.url == "/login") {
          this.router.navigate(['admin'])
          return false 
        }
        else if (!authenticated && state.url != "/login") {
          this.router.navigate(['login'])
          return false
        } else return true
      });


  }

}
