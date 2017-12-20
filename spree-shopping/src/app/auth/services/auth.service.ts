import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import * as _ from 'lodash';

import { User } from 'app/user/models/user.model';
import { HttpService } from 'app/core/services/http.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';


@Injectable()
export class AuthService {

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) { }

  login(email: String, password: String) {
    const headers = this.httpService.defaultHeaders();
    headers.delete('Content-Type');

    return this.httpService.post(
        'users/sign_in',
        {
          user: {
            email: email,
            password: password
          }
        },
        headers
      );
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
