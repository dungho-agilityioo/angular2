import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { OrderService } from 'app/order/services/order.service';
import { AddressService } from './services/address.service';

@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  emailForm: FormGroup;
  isAuthenticated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addressForm = this.addressService.initAddressForm();
    this.emailForm = this.addressService.initEmailForm();
    // handle after
    this.isAuthenticated = false;
  }

  saveAddress(address) {
    let addressAttributes;
    if ( this.isAuthenticated) {
      addressAttributes = this.addressService.createAddresAttributes(address);
    } else {
      const email = this.getEmailFromUser();
      addressAttributes = this.addressService.createGuestAddressAttributes(address, email);
    }
    this.orderService.updateOrder(addressAttributes)
      .subscribe();

    this.router.navigate(['checkout/delivery']);
  }

  /**
   * Get value of email from Email form
   */
  private getEmailFromUser() {
    return this.emailForm.value.email;
  }

}
