import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';


import {
  Order
} from 'app/order/models/order.model';
import {
  LocalStorageService
} from 'app/core/services/local-storage.service';
import {
  UserConfigService
} from 'app/user/services/user-config.service';
import {
  OrderService
} from 'app/order/services/order.service';

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
    private orderService: OrderService,
    private localStorageService: LocalStorageService,
    private cd: ChangeDetectorRef,
    private userConfig: UserConfigService
  ) { }

  ngOnInit() {
    const email = this.localStorageService.getUser().email;
    this.orderUrl = `/${this.userConfig.PATH_NAME.USER_ORDER}`;

    this.orderService.getOrders(email)
      .subscribe( res => {
        // const data = res.json();
        this.orders = [...res.orders];
        this.cd.markForCheck();
      });

  }

}
