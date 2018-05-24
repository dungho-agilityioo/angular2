import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';

import {
  Product
} from 'app/product/models/product.model';

@Component({
  selector: 'add-to-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() variantId: number;
  @Input() quantity: number;
  @Output() btnCartClick = new EventEmitter<{variantId: number, quantity: number}>();
  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    this.btnCartClick.emit({
      variantId: this.variantId,
      quantity: 1
    });
  }

  removeFromCart() {
    this.btnCartClick.emit({
      variantId: this.variantId,
      quantity: -1
    });
  }

}
