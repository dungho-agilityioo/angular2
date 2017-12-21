import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  NgForm,
  FormGroup, FormBuilder, FormControl, Validators
} from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { User } from 'app/user/models/user.model';
import { AuthService } from 'app/auth/services/auth.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpService } from 'app/core/services/http.service';


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  returnUrl: string;
  user: any = {};
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.redirectIfUserLoggedIn();
  }

  login(userForm: any) {

    this.authService.login(userForm.email, userForm.password)
      .subscribe(
        res => {
          const user = res.json();

          if ( ! user.error ) {
            this.localStorageService.setUser(user);
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // display error message
            this.httpService.loading$.next({
                loading: false,
                hasError: true,
                hasMsg: 'Invalid email or password'
              });
          }
        }
      );
  }

  /**
   * Redirect to return url if user logged in
   */
  redirectIfUserLoggedIn() {
    if ( this.authService.isLoggedIn() ) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

}
