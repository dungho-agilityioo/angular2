import { Subscription } from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import * as _ from 'lodash';

import { Product } from 'app/product/models/product.model';
import { ProductService } from 'app/product/services/product.service';
import { OrderService } from 'app/order/services/order.service';
import { LineItem } from 'app/order/models/line-item.model';


@Component({
  selector: 'product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
  product: Product;
  orderSub: Subscription;
  productSub: Subscription;
  lineItems: Array<LineItem>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.productSub = this.route.params.switchMap((params) => {
      const slug = params['slug'];

      return this.productService.getProduct(slug);
    })
    .subscribe( product => {
      this.product = product;
    });

    this.orderSub = this.orderService.order$.subscribe(order => {
      if (!_.isEmpty(order)) {
        if (order.state !== 'complete') {
          this.lineItems = [...order.lineItems];
        }
        this.cd.markForCheck();
      }
    });
  }

  /**
   * Get product quantity in cart
   */
  getQuantity() {
    return this.productService.getQuantity(
      this.product,
      this.lineItems
    );
  }

  /**
   * Add product to cart
   */
  addToCart() {
    const variantId = this.product.master.id;
    this.orderService.addToCart(variantId)
      .subscribe();
  }

  /**
   * Handle button add or remove cart
   */
  onBtnCart(item): void {
    this.orderService.addOrRemoveItem(
      item.variantId,
      item.quantity
    ).subscribe();
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
    this.productSub.unsubscribe();
  }

}
