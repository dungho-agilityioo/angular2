import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import * as _ from 'lodash';

import { OrderService } from 'app/order/services/order.service';
import { AuthService } from 'app/auth/services/auth.service';
import { OrderTotal } from 'app/order/models/order-total.model';
import * as authConfig from 'app/auth/auth-config';
import * as userConfig from 'app/user/user-config';
import { UserUrl } from 'app/user/models/use-url.model';

@Component({
  selector: 'main-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  @Input() appName: string;

  orderTotal: OrderTotal = new OrderTotal();
  isAuthenticated: boolean | false;
  userUrl: UserUrl = {};

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.orderService.order$.subscribe( order => {
      if (!_.isEmpty(order) && !order.error) {
        this.orderTotal = {
          total: order.total,
          itemCount: order.totalQuantity
        };
        this.cd.markForCheck();
      }
    });

    this.authService.authStatus$.subscribe( res => {
      if ( this.authService.isLoggedIn() ) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
      this.cd.markForCheck();
    });

    this.userUrl = {
      login: `/${authConfig.PATH_NAME.SIGN_IN}`,
      order: `/${userConfig.PATH_NAME.USER_ORDER}`,
      signup: `/${authConfig.PATH_NAME.SIGN_UP}`
    };
  }

}
