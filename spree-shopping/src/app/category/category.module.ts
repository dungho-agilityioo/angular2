import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';

const COMPONENTS = [
  CategoryComponent
];

@NgModule({
  imports: [
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CategoryModule { }
