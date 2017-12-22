import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

import {
  Order
} from 'app/order/models/order.model';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: Order;

  constructor() { }

  ngOnInit() {

  }

}
