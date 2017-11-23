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
  languages = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.languages = [
      { id: 1, name: 'VietNamese'},
      { id: 2, name: 'English' }
    ];
    this.user = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      account: this.fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, {validator: passwrodMatch}),
      language: ['', Validators.required]
    });
  }

  reset() {
    this.user.reset();
  }

  partialUpdate() {
    this.user.patchValue({
      name: 'Dung Ho',
      email: 'dung.hoduy@asnet.com.vn',
    });
  }

  fullUpdate() {
    this.user.setValue({
      name: 'Dung Ho',
      email: 'dung.hoduy@asnet.com.vn',
      account: {
        password: '123456',
        passwordConfirm: '123456'
      },
      language: 1
    });
  }

  save(form: any) {
    console.log(form.value);
  }

}
