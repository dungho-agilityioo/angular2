import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { TruncatePipe} from './../../../shared/pipes/truncate.pipe';
import { FormatUrlImagePipe } from './../../../shared/pipes/format-url-image.pipe';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
  products: Array<Product> = [];
  totalItems: number;
  currentPage: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts(1);
  }

  onPagerChange(page: number) {
    console.log('page on product list ', page);
    this.getProducts(page);
  }

  /**
   * Get list product by page number
   * @param page
   */
  private getProducts(page: number) {
    this.productService.getProducts(page)
      .subscribe( result => {
        this.totalItems = result.total_count;
        this.currentPage = result.current_page;
        this.products = result.products;
      });
  }

}
