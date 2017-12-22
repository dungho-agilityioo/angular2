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
import {
  CategoryConfigService
} from 'app/category/services/category-config.service';

const MODULES = [
  BrowserModule
];
const COMPONENTS = [
  CategoryComponent
];
const PROVIDERS = [
  CategoryService,
  CategoryConfigService
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
