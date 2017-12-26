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
import { AuthService } from 'app/auth/services/auth.service';
import * as cartConfig from 'app/cart/cart-config';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.order$.subscribe(res => {

      this.addressForm = this.addressService.initAddressForm();

      if (!_.isEmpty(res)) {
        const order = res.json();
        this.orderState = order.state;
        if (!_.isNull(order.ship_address)) {
          this.address = order.ship_address;
        }
        this.cd.markForCheck();
      }
    });
    // set user login or not
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  saveAddress(address) {
    if (this.orderState === 'address') {
      let addressAttributes;

      addressAttributes = this.addressService.createAddresAttributes(address);
      this.subscription = this.orderService.updateOrder(addressAttributes)
        .subscribe(
          res => {
            const data = res.json();

            if ( !data.error ) {
              this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_DELIVERY]);
            } else {
              this.router.navigate([cartConfig.PATH_NAME.CHECKOUT_ADDRESS]);
            }
          }
        );
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
