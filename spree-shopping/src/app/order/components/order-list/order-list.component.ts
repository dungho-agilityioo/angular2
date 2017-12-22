import { Order } from 'app/order/models/order.model';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[];
  @Input() orderUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
