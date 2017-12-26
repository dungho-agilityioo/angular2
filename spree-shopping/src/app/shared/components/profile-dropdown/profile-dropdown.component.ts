import { Component, OnInit, Input } from '@angular/core';

import { OrderTotal } from 'app/order/models/order-total.model';

@Component({
  selector: 'profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  @Input() orderTotal: OrderTotal;
  constructor() { }

  ngOnInit() {
    console.log('order total ', this.orderTotal);
  }

}
