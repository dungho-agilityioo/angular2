import { Taxon } from './../product/models/taxon.model';
import { CategoryService } from './services/category.service';
import { Component, OnInit } from '@angular/core';

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
      .subscribe( res => this.categories = res );
  }

}
