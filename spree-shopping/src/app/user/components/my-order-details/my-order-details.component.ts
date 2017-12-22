import {
  ActivatedRoute
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';

import * as _ from 'lodash';

import {
  OrderService
} from 'app/order/services/order.service';
import {
  Order
} from 'app/order/models/order.model';

@Component({
  selector: 'my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.scss']
})
export class MyOrderDetailsComponent implements OnInit {
  order: Order;
  orderNumber: string;
  orderToken: string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.orderNumber = params['number'];
      this.orderToken = params['token'];
    });
    this.orderService.getOrder(this.orderNumber, this.orderToken)
      .subscribe( res => {
        if (!_.isEmpty(res)) {
          const data = res.json();
          this.order = data;
        }
      });
  }

}
