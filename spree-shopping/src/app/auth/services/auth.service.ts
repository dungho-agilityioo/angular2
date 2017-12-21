import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import * as _ from 'lodash';

import { User } from 'app/user/models/user.model';
import { HttpService } from 'app/core/services/http.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';


@Injectable()
export class AuthService {
  authStatus$: Subject<any> = new BehaviorSubject<any>([]);

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * Sign in
   * @param email
   * @param password
   */
  login(email: String, password: String): Observable<any> {
    const headers = this.httpService.defaultHeaders();
    headers.delete('Content-Type');

    return Observable.create(obs => {
      this.httpService.post(
        'users/sign_in',
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
  registry(email: String, password: String): Observable<any> {
    return this.httpService.post(
      'users/sign_up',
      this.buildUserParams(email, password)
    );
  }

  /**
   * Build User params
   * @param email
   * @param password
   */
  private buildUserParams(email: String, password: String): any {
    return {
      user: {
        email: email,
        password: password
      }
    };
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
