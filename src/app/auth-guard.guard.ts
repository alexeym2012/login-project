import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private session: SessionService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.session.getItem('isLoggedIn') && this.session.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
