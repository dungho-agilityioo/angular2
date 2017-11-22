import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-form-login-builder',
  templateUrl: './form-login-builder.component.html',
  styleUrls: ['./form-login-builder.component.css']
})
export class FormLoginBuilderComponent implements OnInit {
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'email': ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        this.passwordValidator
      ])],
    });
  }

  ngOnInit() {

  }
  onSubmit(form: any): void {
    console.log('You submitted value: ', form);
  }

  passwordValidator(control: FormControl): { [s: string]: boolean} {
    if (!control.value.match(/^123/)) {
      return { invalidPassword: true };
    }
  }
}
