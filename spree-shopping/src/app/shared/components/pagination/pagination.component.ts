import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import * as _ from 'lodash';

import {
  environment
} from 'env/environment';
import {
  PagerOptions
} from 'app/shared/models/pager-options.model';
import {
  PaginationService
} from 'app/shared/services/pagination.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Output() pagerSelected = new EventEmitter();

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: PagerOptions = {};

  // paged items
  pagedItems: any[];

  pages: Array<number> = [];

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
    // initialize to page currentPage
    this.setPage(this.currentPage);
  }

  /**
   * set page number and emit a event to parent component
   * @param page
   */
  setPage(page: number) {
    const perPage = environment.perPage;

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginationService.getPager(this.totalItems, page, perPage);

    // Emit a event to parent component
    this.pagerSelected.emit(page);
  }

  /**
   * Set first page
   */
  onFirstPage() {
    this.setPage(1);
  }

  /**
   * Set last page
   */
  onLastPage() {
    this.setPage(this.pager.totalPages);
  }

  /**
   * Set previous page
   */
  onPreviousPage() {
    if (this.pager.currentPage > 1) {
      this.setPage(this.pager.currentPage - 1);
    }
  }

  /**
   * Set next page
   */
  onNextPage() {
    if (this.pager.currentPage < this.pager.totalPages) {
      this.setPage(this.pager.currentPage + 1);
    }
  }

}
