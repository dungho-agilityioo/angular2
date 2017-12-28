import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import * as _ from 'lodash';

import { TruncatePipe } from 'app/shared/pipes/truncate.pipe';
import { FormatUrlImagePipe } from 'app/shared/pipes/format-url-image.pipe';

import { OrderService } from 'app/order/services/order.service';
import { ProductService } from 'app/product/services/product.service';

import { Product } from 'app/product/models/product.model';
import { LineItem } from 'app/order/models/line-item.model';
import { Variant } from 'app/product/models/variant.model';
import { Taxon } from 'app/category/models/taxon.model';
import { PagerOptions } from 'app/shared/models/pager-options.model';

@Component({
  selector: 'product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit, OnDestroy {
  products: Array<Product[]> = [];
  pageOptions: PagerOptions = new PagerOptions();
  lineItems: Array<LineItem>;
  subscription: Subscription;
  categoryId: number | 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.order$.subscribe(order => {
      if (!_.isEmpty(order) && !order.errors && order.state !== 'complete') {
        this.lineItems = [...order.lineItems];
        this.cd.markForCheck();
      }
    });

    this.getProducts(1);
  }

  /**
   * Get line item quantity in cart
   * @param product
   * @return number
   */
  getQuantity(product: Product): number {

    return this.productService.getQuantity(product, this.lineItems);
  }

  /**
   * handle use click page number
   * @param page
   */
  onPagerChange(page: number): void {
    this.getProducts(page, this.categoryId);
  }

  filterByCategory(category: Taxon): void {
    this.categoryId = category.id;
    this.getProducts(1, this.categoryId);
    this.cd.markForCheck();
  }

  /**
   * Get list product by page number
   * @param page
   */
  private getProducts(page: number, taxonId?: number) {

    this.productService.getProducts(page, taxonId)
      .subscribe(result => {
        this.products = [];
        if (!_.isEmpty(result) && !result.errors ) {
          this.pageOptions = _.assignIn({}, {
            totalItems: result.totalCount,
            currentPage: result.currentPage
          });
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
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
