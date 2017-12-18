import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/order/services/order.service';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}
  ngOnInit() {
    this.orderService.getCurrentOrder()
      .subscribe( res => {
        this.orderService.order$.next(res);
        this.cartService.cart$.next(res);
      });
  }
}
