import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import * as _ from 'lodash';
import { Order } from 'app/order/models/order.model';
import { LineItem } from 'app/order/models/line-item.model';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'main-header',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @Input() appName: string;

  totalLineItem = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe( res => {
      if (!_.isEmpty(res)) {
        const order: Order = res.json();
        this.totalLineItem = order.total_quantity;
      }
    });
  }

}
