
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('i am checking to see if you are logged in');

    const isLoggedIn = this.authService.isLoggedIn();
console.log('state url ', state.url);
    if ( ! isLoggedIn ) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

      return false;
    }

    return true;
  }

  canActivateChild() {
    console.log('checking child route access');
    return false;
  }
}
