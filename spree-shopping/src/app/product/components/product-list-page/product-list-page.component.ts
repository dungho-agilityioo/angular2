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
  products;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe( products => this.products = products.products );
  }

}
