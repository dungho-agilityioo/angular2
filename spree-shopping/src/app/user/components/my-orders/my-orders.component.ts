import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { UserService } from 'app/user/services/user.service';
import { Order } from 'app/order/models/order.model';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyOrdersComponent implements OnInit {
  orders: any;
  orderUrl: string;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const email = this.localStorageService.getUser().email;
    this.orderUrl = '/user/order';

    this.userService.getOrders(email)
      .subscribe( res => {
        // const data = res.json();
        this.orders = [...res.orders];
        this.cd.markForCheck();
        console.log('orders 11', this.orders);
      });

  }

}
