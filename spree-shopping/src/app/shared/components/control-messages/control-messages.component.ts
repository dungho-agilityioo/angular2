import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ValidationService } from 'app/core/services/validation.service';

@Component({
  selector: 'control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() controlName: string;

  constructor() {}

  get errorMessage() {

    for ( const propertyName in this.control.errors ) {

      if ( this.control.errors.hasOwnProperty(propertyName)
        && this.control.touched) {
          const defaultMessage =  ValidationService.getValidatorErrorMessage(
              propertyName,
              this.control.errors[propertyName],
              this.controlName
            );

          return defaultMessage || this.control.errors.message;
        }
    }

    return null;
  }
}
