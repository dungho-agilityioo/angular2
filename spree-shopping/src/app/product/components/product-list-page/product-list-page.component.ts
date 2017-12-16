import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import * as _ from 'lodash';
import {
  TruncatePipe
} from 'app/shared/pipes/truncate.pipe';
import {
  FormatUrlImagePipe
} from 'app/shared/pipes/format-url-image.pipe';

import {
  OrderService
} from 'app/order/services/order.service';
import {
  ProductService
} from 'app/product/services/product.service';

import {
  Product
} from 'app/product/models/product.model';
import { LineItem } from 'app/order/models/line-item.model';
import { Variant } from 'app/product/models/variant.model';

@Component({
  selector: 'product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
  products: Array<Product[]> = [];
  totalItems: number;
  currentPage: number;
  lineItems: Array<LineItem>;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.productService.products$.subscribe();
    this.orderService.order$.subscribe( res => {
      if ( !_.isEmpty(res)) {
        const order = res.json();
        this.lineItems = order.line_items;
        this.cd.markForCheck();
      }
    });
    this.orderService.getCurrentOrder()
      .subscribe( res => {
        this.orderService.order$.next(res);
      });
    this.getProducts(1);
  }

  /**
   * Get line item quantity in cart
   * @param product
   * @return number
   */
  getQuantity(product: Product): number {

    // tslint:disable-next-line:curly
    if (_.isUndefined(this.lineItems)) return 0;

    const variantId = product.master.id;
    const item =  this.lineItems.find(
        li => li.variant_id === variantId
      );
    return _.isUndefined(item) ? 0 : item.quantity;
  }

  /**
   * handle use click page number
   * @param page
   */
  onPagerChange(page: number) {
    this.getProducts(page);
  }

  /**
   * Get list product by page number
   * @param page
   */
  private getProducts(page: number) {

    this.productService.getProducts(page)
      .subscribe(result => {
        if (!_.isEmpty(result)) {
          result = result.json();
          this.totalItems = result.total_count;
          this.currentPage = result.current_page;
          this.products = [...result.products];
          this.cd.markForCheck();
        }
      });
  }

  onBtnCart(item): void {
    this.orderService.addOrRemoveItem(
      item.variantId,
      item.quantity
    ).subscribe();
  }


  addToCart(product) {
    const variantId = product.master.id;
    this.orderService.addToCart(variantId)
      .subscribe(
      res => {
        console.log(res);
      }
      );
  }

}
