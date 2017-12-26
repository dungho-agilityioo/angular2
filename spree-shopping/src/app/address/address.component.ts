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
import { Address } from 'app/address/models/address';
import * as cartConfig from 'app/cart/cart-config';
import { ValidationService } from 'app/core/services/validation.service';

@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  isAuthenticated: boolean;
  subscription: Subscription;
  orderState: String;
  address: Address = new Address();
  email: String;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private validatonService: ValidationService
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.order$.subscribe(res => {

      if (!_.isEmpty(res)) {
        const order = res.json();
        if ( !order.errors ) {
          this.orderState = order.state;

          if (_.isObject(order.ship_address)) {
            // this.addressForm = this.addressService.initAddressForm(order.ship_address);
            const addressValue = _.pick(order.ship_address, ['firstname', 'lastname', 'address1', 'city', 'state_id', 'zipcode', 'phone']);
            this.addressForm.setValue(addressValue);
          }
        }
      }
    });

    this.addressForm = this.addressService.initAddressForm(this.address);
  }

  saveAddress(address) {
    if (this.orderState === 'address') {
      const values = this.addressForm.value;
      const keys = Object.keys(values);
      let addressAttributes;

      // if form valid
      if ( this.addressForm.valid) {
        addressAttributes = this.addressService.createAddresAttributes(address);
        this.subscription = this.orderService.updateOrder(addressAttributes)
          .subscribe(
            res => {
              const data = res.json();
              const errors = data.errors;

              if ( !errors ) {
                this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_DELIVERY]);
              } else {
                // display error message
                keys.forEach( val => {

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
    if ( !_.isUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

}
