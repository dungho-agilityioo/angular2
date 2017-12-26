import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import * as _ from 'lodash';

import { Image } from 'app/product/models/image.model';

@Component({
  selector: 'product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  @Input() images: Array<Image>;
  currentImage: Image = new Image();

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  selectedImage(image: Image): void {
    this.currentImage = _.assignIn({}, image) ;
    this.cd.markForCheck();
  }

}
