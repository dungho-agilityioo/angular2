import { Injectable } from '@angular/core';
import { User } from 'app/user/models/user.model';
import { HttpService } from 'app/core/services/http.service';


@Injectable()
export class AuthService {

  constructor(
    private httpService: HttpService
  ) { }

  login(email: String, password: String) {
    return this.httpService.post(
        'sessions',
        {
          user: {
            login: email,
            password: password
          }
        }
      );
  }

}
