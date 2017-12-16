import {
  Component,
  OnInit
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


@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: String = '';
  user: any = {};
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.returnUrl =  this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(userForm: any) {
    console.log(userForm);
    // this.router.navigate(['']);
    this.authService.login(userForm.email, userForm.password)
      .subscribe( res => {
        console.log('res ', res);
      });
  }

}
