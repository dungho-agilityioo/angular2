import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { ProductProperty } from 'app/product/models/product-property.model';


@Component({
  selector: 'product-property',
  templateUrl: './product-property.component.html',
  styleUrls: ['./product-property.component.scss']
})
export class ProductPropertyComponent implements OnInit {
  @Input() productProperties: ProductProperty;
  constructor() { }

  ngOnInit() {
  }

}
