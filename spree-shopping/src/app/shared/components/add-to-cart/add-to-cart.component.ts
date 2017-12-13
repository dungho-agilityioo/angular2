import { Product } from 'app/product/models/product.model';
import { OrderService } from 'app/order/services/order.service';
import {
  Component,
  OnInit,
  Input } from '@angular/core';

@Component({
  selector: 'add-to-cart',
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
    console.log('product init ', this.product);
    const variantId = this.product.master.id;
    this.orderService.addToCart(variantId)
      .subscribe(
        res => {
          console.log(res);
        }
      );
    // this.orderService.createNewLineItem(variantId)
    //   .then(
    //     res => console.log(res)
    //   );
  }

}
