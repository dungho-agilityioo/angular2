import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import * as _ from 'lodash';

import { HttpService } from 'app/core/services/http.service';
import { Address } from 'app/address/models/address.model';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import * as addressConfig from 'app/address/address-config';
import { ValidationService } from 'app/core/services/validation.service';

@Injectable()
export class AddressService {

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private httpService: HttpService
  ) { }

  /**
   * Init address form
   */
  initAddressForm(address: Address): FormGroup {
    return this.fb.group({
      'firstName': [address.firstName, Validators.required],
      'lastName': [address.lastName, Validators.required],
      'address': [address.address, Validators.required],
      'city': [address.city, Validators.required],
      'phone': [address.phone, [
                      Validators.required,
                      ValidationService.phoneValidator()
                    ]
                  ],
      'zipCode': [address.zipcode, Validators.required],
      'stateId': [address.stateId, Validators.required],
      'countryId': [address.countryId, Validators.required]
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

    return this.createGuestAddressAttributes(
        address, user.email
      );
  }

  /**
   * Create Attributes of Guest Address
   * @param address
   * @param email
   */
  createGuestAddressAttributes(address: Address, email: string) {
    const addressValue = this.convertAddressField(address);

    return {
      order: {
        email: email,
        bill_address_attributes: addressValue,
        ship_address_attributes: addressValue
      }
    };
  }

  /**
   * Get list states by country id
   * @param countryId
   */
  getStatesByCountry(countryId: number): Observable<any> {
    return this.httpService.get(
        addressConfig.API_PATH_NAME.STATES_URL,
        {
          country_id: countryId
        }
      )
      .map( data => {
        if (!data.error ) {
          return data.states;
        } else {
          return [];
        }
      });
  }

  /**
   * Get all country
   */
  getCountries(): Observable<any> {
    return this.httpService.get(
      addressConfig.API_PATH_NAME.COUNTRY_URL,
      { per_page: 250 }
    )
    .map( data => {
      if (!data.error ) {
        return data.countries;
      } else {
        return [];
      }
    });
  }

  /**
   * Convert field name to undercore to submit to server
   * @param address
   */
  convertAddressField(address: Address): any {
    const mapFields = addressConfig.MAP_FIELDS;
    const rs = {};

    // tslint:disable-next-line:forin
    for ( const value in address ) {
      const field = mapFields[value];
      rs[field] = address[value];
    }

    return rs;
  }
}
