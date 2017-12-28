import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

import { Taxon } from 'app/product/models/taxon.model';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'list-category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Array<Taxon> = [];
  @Output() filterByCategory = new EventEmitter();
  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(res => {
        this.categories = [...res];
        this.cd.markForCheck();
      });
  }

  filterProduct(category: Taxon) {
    this.filterByCategory.emit(category);
  }

}
