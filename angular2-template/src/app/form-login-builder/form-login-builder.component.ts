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
  email: AbstractControl;
  password: AbstractControl;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      'email': ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        this.passwordValidator
      ])],
    });

    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];

    this.email.valueChanges.subscribe(
      (value: string) => console.log('email changed to: ', value)
    );

    this.myForm.valueChanges.subscribe(
      (form: any) => console.log('form changed to: ', form)
    );
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
