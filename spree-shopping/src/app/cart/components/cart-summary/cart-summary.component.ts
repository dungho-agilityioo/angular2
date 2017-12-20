import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import * as _ from 'lodash';
import { OrderService } from 'app/order/services/order.service';
import { OrderTotal } from 'app/order/models/order-total.model';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  @Input() orderTotal: OrderTotal;

  constructor() { }

  ngOnInit() {
  }

}
