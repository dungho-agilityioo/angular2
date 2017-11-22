import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
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
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  ngOnInit() {

  }
  onSubmit(form: any): void {
    console.log('You submitted value: ', form);
  }
}
