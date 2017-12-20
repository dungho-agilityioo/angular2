
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isLoggedIn = this.authService.isLoggedIn();

    if ( ! isLoggedIn ) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

      return false;
    }

    return true;
  }

}
