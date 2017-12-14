import {
  Component,
  OnInit
} from '@angular/core';

import {
  Taxon
} from 'app/product/models/taxon.model';
import {
  CategoryService
} from './services/category.service';


@Component({
  selector: 'list-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Array<Taxon> = [];
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(res => this.categories = res);
  }

}
