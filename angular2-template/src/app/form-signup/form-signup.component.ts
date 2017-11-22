import { passwrodMatch } from './password-match';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {
  user: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      account: this.fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, {validator: passwrodMatch})
    });
  }

  save(form: any) {
    console.log(form);
  }

}
