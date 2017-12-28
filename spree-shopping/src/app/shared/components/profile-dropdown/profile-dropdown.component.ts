import { Component, OnInit, Input } from '@angular/core';

import { OrderTotal } from 'app/order/models/order-total.model';
import { UserUrl } from 'app/user/models/use-url.model';
import { AuthService } from 'app/auth/services/auth.service';

@Component({
  selector: 'profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  @Input() orderTotal: OrderTotal;
  @Input() isAuthenticated: boolean;
  @Input() userUrl: UserUrl;
  @Input() authService: AuthService;

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
