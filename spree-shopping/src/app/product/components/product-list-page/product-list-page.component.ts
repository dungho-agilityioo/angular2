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

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.productService.products$.subscribe();
    this.getProducts(1);
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
