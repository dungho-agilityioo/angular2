import { Injectable } from '@angular/core';

@Injectable()
export class CartConfigService {

  PATH_NAME = {
    CHECKOUT_CART: 'cart',
    CHECKOUT_ADDRESS: 'checkout/address',
    CHECKOUT_DELIVERY: 'checkout/delivery',
    CHECKOUT_PAYMENT: 'checkout/payment'
  };

}
