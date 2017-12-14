import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  OrderService
} from 'app/order/services/order.service';

import {
  Product
} from 'app/product/models/product.model';

@Component({
  selector: 'add-to-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() product: Product;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.orderService.addToCart(this.product)
      .subscribe(
      res => {
        console.log(res);
      }
      );
  }

  removeFromCart() {
    console.log('removed');
  }

}
