import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import * as _ from 'lodash';
import { OrderService } from 'app/order/services/order.service';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  orderTotal = {};
  total: number;
  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.orderService.order$.subscribe( res => {
      if (!_.isEmpty(res)) {
        const order = res.json();
        this.total = order.total;
        this.orderTotal = {
          itemTotal: order.item_total,
          total: order.total,
          itemCount: order.total_quantity,
          taxTotal: order.tax_total
        };
        this.cd.markForCheck();
        console.log('adfad ', this.orderTotal);
      }
    });
  }

}
