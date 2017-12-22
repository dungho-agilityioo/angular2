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
import {
  Router
} from '@angular/router';
import {
  Subscription
} from 'rxjs/Subscription';

import * as _ from 'lodash';

import {
  OrderService
} from 'app/order/services/order.service';
import {
  AddressService
} from './services/address.service';
import {
  Address
} from 'app/address/models/address';
import {
  AuthService
} from 'app/auth/services/auth.service';
import {
  CartConfigService
} from 'app/cart/services/cart-config.service';

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
    private authService: AuthService,
    private cartConfig: CartConfigService
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
    let addressAttributes;

    addressAttributes = this.addressService.createAddresAttributes(address);

    if (this.orderState === 'address') {
      this.subscription = this.orderService.updateOrder(addressAttributes)
        .subscribe(
          res => {
            const data = res.json();

            if ( !data.error ) {
              this.router.navigate([this.cartConfig.PATH_NAME.CHECKOUT_DELIVERY]);
            } else {
              this.router.navigate([this.cartConfig.PATH_NAME.CHECKOUT_ADDRESS]);
            }
          }
        );
    } else {
      this.router.navigate([this.cartConfig.PATH_NAME.CHECKOUT_DELIVERY]);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
