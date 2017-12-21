import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { AuthService } from 'app/auth/services/auth.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpService } from 'app/core/services/http.service';
import { passwrodMatch } from './password-match';

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  returnUrl: string;
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpService: HttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.redirectIfUserLoggedIn();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.initUserForm();
  }

  /**
   * Sign up a user
   */
  signUp() {
    const values = this.signUpForm.value;
    const keys = Object.keys(values);

    if (this.signUpForm.valid) {
      this.authService.registry(values.email, values.password)
        .subscribe(
          res => {
            const user = res.json();
            const errors = user.errors;

            if ( ! errors ) {
              this.localStorageService.setUser(user);
              this.router.navigateByUrl(this.returnUrl);
            } else {
              // display error message
              keys.forEach(val => {
                if (errors[val]) {
                  this.pushErrorToForm(val, errors[val][0]);
                }
              });
            }
          }
        );
    } else {
      // else reset message error to show default error on view
      keys.forEach(val => {
        const ctrl = this.signUpForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorToForm(val, null);
          ctrl.markAsTouched();
        }
      });
    }
  }

  /**
   * Push error to every control to show on form
   * @param ctrl_name
   * @param msg
   */
  private pushErrorToForm(ctrl_name: string, msg: string): void {
    this.signUpForm.controls[ctrl_name].setErrors({'msg': msg});
  }

  /**
   * Init Sign up form
   */
  private initUserForm() {
    this.signUpForm = this.fb.group({
      'email': [ '', [ Validators.required, Validators.email] ],
      'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
      'passwordConfirmation': [ '', [ Validators.required, Validators.minLength(6) ] ]
    }, { validator: passwrodMatch});
  }

  /**
   * Redirect to home page if user logged in
   */
  redirectIfUserLoggedIn() {
    if ( this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
  }

}
