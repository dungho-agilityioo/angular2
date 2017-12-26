import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

import * as coreConfig from 'app/core/core-config';

@Injectable()
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any, controlName?: string) {
    const messageConfig = coreConfig.VALIDATION.MESSAGES;

    const complied = _.template(messageConfig[validatorName]);

    return complied({
      name: controlName
    });
  }


  static emailValidator(control: AbstractControl) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static phoneValidator() {

    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;

      if ( _.isUndefined(value) || value === '' || _.isNull(value) ) {
        return null;
      }

      const phone = value.match(/\d/g);

      if ( phone.length === 10 || phone.length === 11 ) {
        return null;
      } else {
        return { 'invalidPhone': true };
      }
    };
  }

  static passwrodMatch(control: AbstractControl): { [key: string]: boolean } {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirmation');

    if ( !password || !passwordConfirm ) { return null; }
    return password.value === passwordConfirm.value ? null : { nomatch: true };
  }

   /**
   * Push error to every control to show on form
   * @param form
   * @param ctrlName
   * @param message
   */
  pushErrorToForm(form: FormGroup, ctrlName: string, message: string): void {
    form.controls[ctrlName].setErrors({'message': message});
  }
}
