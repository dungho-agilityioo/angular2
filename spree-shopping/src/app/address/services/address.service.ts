import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import * as _ from 'lodash';

import { HttpService } from 'app/core/services/http.service';
import { Address } from 'app/address/models/address';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { AddressConfigService } from './address-config.service';
import { ValidationService } from 'app/core/services/validation.service';


@Injectable()
export class AddressService {

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private addressConfig: AddressConfigService
  ) { }

  /**
   * Init address form
   */
  initAddressForm(): FormGroup {
    return this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'address1': ['', Validators.required],
      'city': ['', Validators.required],
      'phone': ['', [
                      Validators.required,
                      ValidationService.phoneValidator()
                    ]
                  ],
      'zipcode': ['', Validators.required],
      'state_id': ['', Validators.required]
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
    const user = this.localStorageService.getUser();
    const countryId = this.addressConfig.VALUES.COUNTRY_ID;
    address = _.assign({ country_id: countryId}, address);

    return {
      order: {
        user_id: user.id,
        email: user.email,
        bill_address_attributes: address,
        ship_address_attributes: address
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
      order: {
        email: email,
        bill_address_attributes: address,
        ship_address_attributes: address
      }
    };
  }
}
