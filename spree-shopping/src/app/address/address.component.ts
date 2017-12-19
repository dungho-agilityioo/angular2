
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

@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  emailForm: FormGroup;
  isAuthenticated: boolean;
  subscription: Subscription;
  orderState: String;
  address: Address;
  email: String;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.orderService.order$.subscribe(res => {
      if (!_.isEmpty(res)) {
        const order = res.json();
        this.addressForm = this.addressService.initAddressForm();
        this.emailForm = this.addressService.initEmailForm();
        this.orderState = order.state;
        this.address = order.ship_address;
        this.email = order.email;
        this.cd.markForCheck();
      }
    });
    // handle after
    this.isAuthenticated = false;
  }

  saveAddress(address) {
    let addressAttributes;
    if (this.isAuthenticated) {
      addressAttributes = this.addressService.createAddresAttributes(address);
    } else {
      const email = this.getEmailFromUser();
      addressAttributes = this.addressService.createGuestAddressAttributes(address, email);
    }
console.log('state in address ', this.orderState);
    if (this.orderState === 'delivery') {
      this.subscription = this.orderService.updateOrder(addressAttributes)
        .subscribe(
          success => this.router.navigate(['checkout/delivery']),
          error => {
            console.log('errr', error);
            this.router.navigate(['checkout/address']);
          }
        );
    } else {
      this.router.navigate(['checkout/delivery']);
    }
  }

  /**
   * Get value of email from Email form
   */
  private getEmailFromUser() {
    return this.emailForm.value.email;
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.subscription)) {
      // this.subscription.unsubscribe();
    }
  }
}
