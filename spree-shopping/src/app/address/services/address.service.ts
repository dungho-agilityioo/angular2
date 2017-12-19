import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { HttpService } from 'app/core/services/http.service';
import { Address } from 'app/address/models/address';

@Injectable()
export class AddressService {

  constructor(private fb: FormBuilder) { }

  /**
   * Init address form
   */
  initAddressForm(): FormGroup {
    return this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'address1': ['', Validators.required],
      'city': ['', Validators.required],
      'phone': ['', Validators.required],
      'zipcode': [10001, Validators.required],
      'state_id': [3561, Validators.required],
      'country_id': [232, Validators.required]
    });
  }

  initEmailForm(): FormGroup {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Create Attributes of Address
   * @param address
   */
  createAddresAttributes(address: Address) {
    return {
      'order': {
        'bill_address_attributes': address,
        'ship_address_attributes': address
      }
    };
  }

  /**
   * Create Attributes of Guest Address
   * @param address
   * @param email
   */
  createGuestAddressAttributes(address: Address, email: String) {
    return {
      'order': {
        'email': email,
        'bill_address_attributes': address,
        'ship_address_attributes': address
      }
    };
  }
}
