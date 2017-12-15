import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';
import {
  CategoryService
} from './services/category.service';

import {
  CategoryComponent
} from './category.component';

const MODULES = [
  BrowserModule
];
const COMPONENTS = [
  CategoryComponent
];
const PROVIDERS = [
  CategoryService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class CategoryModule { }
