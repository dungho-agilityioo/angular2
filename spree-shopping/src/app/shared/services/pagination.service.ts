import { PagerOptions } from 'app/shared/models/pager-options.model';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class PaginationService {

  constructor() { }

  /**
   * Get page object
   * @param pager
   * @param currentPage
   * @return PagerOptions
   */
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 12): PagerOptions {
    const pager: PagerOptions = {};
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= pageSize) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    pager.totalItems = totalItems;
    pager.currentPage = currentPage;
    pager.pageSize = pageSize;
    pager.totalPages = totalPages;
    pager.startPage = startPage;
    pager.endPage = endPage;
    pager.startIndex = startIndex;
    pager.endIndex = endIndex;
    pager.pages = pages;

    // return object with all pager properties required by the view
    return pager;
  }
}
