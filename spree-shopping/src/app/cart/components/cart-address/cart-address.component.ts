import {
  Component,
  OnInit,
  ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart-address',
  templateUrl: './cart-address.component.html',
  styleUrls: ['./cart-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartAddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
