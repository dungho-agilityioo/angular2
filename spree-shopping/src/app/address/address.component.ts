import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { OrderService } from 'app/order/services/order.service';
import { AddressService } from './services/address.service';
import { Address } from 'app/address/models/address.model';
import * as cartConfig from 'app/cart/cart-config';
import * as addressConfig from 'app/address/address-config';
import { ValidationService } from 'app/core/services/validation.service';
import { State } from './models/state.model';
import { Country } from './models/country.model';
import { SelectOption } from 'app/address/models/select-option.model';


@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  isAuthenticated: boolean;
  subscription: Subscription;
  orderState: String;
  address: Address = new Address();
  cartCheckoutUrl: String;
  countries: Array<SelectOption> = [];
  states: Array<SelectOption> = [];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private validatonService: ValidationService
  ) { }

  ngOnInit() {
    this.cartCheckoutUrl = `/${cartConfig.PATH_NAME.CHECKOUT_CART}`;
    this.subscription = this.orderService.order$.subscribe(order => {

      if (!_.isEmpty(order) && !order.error) {
        this.orderState = order.state;
        const shipAddress = order.shipAddress;

        if (_.isObject(shipAddress)) {
          const addressValue = _.pick(
              shipAddress,
              Object.keys(addressConfig.MAP_FIELDS)
            );
          if (shipAddress.countryId) {
            this.getStatesByCountry(shipAddress.countryId);
          }
          this.addressForm.setValue(addressValue);
        }
      }
    });
    this.addressForm = this.addressService.initAddressForm(this.address);
    this.getCountries();
  }

  /**
   * Get state by country id
   * @param countryId
   */
  private getStatesByCountry(countryId: number): void {
    this.addressService.getStatesByCountry(countryId)
      .subscribe(states => {
        this.states = [];
        states.forEach((state, index) => {
          this.states.push({
            id: state.id,
            text: state.name
          });
        });
        this.states = [...this.states];
        this.cd.markForCheck();
      });
  }

  /**
   * Get and push to countries array
   */
  private getCountries(): void {
    this.addressService.getCountries()
      .subscribe(countries => {
        countries.forEach((country, index) => {
          this.countries.push({
            id: country.id,
            text: country.name
          });
        });
        this.countries = [...this.countries];
        this.cd.markForCheck();
      });
  }

  /**
   * Get state when Country select change
   */
  onSelectCountry(country: SelectOption) {
    this.getStatesByCountry(country.id);
  }

  saveAddress(address) {

    if (this.orderState === 'address') {
      const values = this.addressForm.value;
      const keys = Object.keys(values);
      let addressAttributes;

      // if form valid
      if (this.addressForm.valid) {
        addressAttributes = this.addressService.createAddresAttributes(address);
        this.subscription = this.orderService.updateOrder(addressAttributes)
          .subscribe(
          data => {
            const errors = data.errors;

            if (!errors) {
              this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_DELIVERY]);
            } else {
              // display error message
              keys.forEach(val => {

                const shipVal = `ship_address.${val}`;

                if (errors[shipVal]) {
                  this.validatonService.pushErrorToForm(this.addressForm, val, `${val} ${errors[shipVal][0]}`);
                }
              });
              this.cd.markForCheck();
            }
          }
          );
      } else {
        // else form invalid, reset message error to show default error on view
        keys.forEach(val => {
          const ctrl = this.addressForm.controls[val];
          if (!ctrl.valid) {
            // this.validatonService.pushErrorToForm(this.addressForm, val, null);
            ctrl.markAsTouched();
          }
        });
      }
    } else {
      this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_DELIVERY]);
    }
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

}
