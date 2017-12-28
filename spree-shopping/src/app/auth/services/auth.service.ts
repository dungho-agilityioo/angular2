import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import * as _ from 'lodash';

import { User } from 'app/user/models/user.model';
import { HttpService } from 'app/core/services/http.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import * as authConfig from 'app/auth/auth-config';


@Injectable()
export class AuthService {
  authStatus$: Subject<any> = new BehaviorSubject<any>([]);

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  /**
   * Sign in
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<any> {
    const headers = this.httpService.defaultHeaders();
    headers.delete('Content-Type');

    return Observable.create(obs => {
      this.httpService.post(
        authConfig.API_PATH_NAME.SIGN_IN,
        this.buildUserParams(email, password),
        headers
      ).subscribe( res => {
        this.authStatus$.next(res);
        this.isLoggedIn();
        obs.next(res);
      });
    });
  }

  /**
   * Register user
   * @param email
   * @param password
   */
  registry(email: string, password: string): Observable<any> {
    return this.httpService.post(
      authConfig.API_PATH_NAME.SIGN_UP,
      this.buildUserParams(email, password)
    );
  }

  /**
   * Build User params
   * @param email
   * @param password
   */
  private buildUserParams(email: string, password: string): any {
    return {
      user: {
        email: email,
        password: password
      }
    };
  }

  /**
   * Log out
   */
  logout() {
    this.localStorageService.removeUser();
    this.router.navigate(['/']);
  }

  /**
   * Check user login or not
   * @return boolean
   */
  isLoggedIn(): boolean {
    const userApiKey = this.localStorageService.getUserApiKey();

    return _.isNull(userApiKey) ? false : true;
  }

}
