import { ProductService } from './services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.product = this.productService.getProduct("10")
      .subscribe(
        result => this.product = result
      );
  }

}
