import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as _ from 'lodash';

import { HttpService } from 'app/core/services/http.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  loading = {};
  constructor(
    private httpService: HttpService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.httpService.loading$.subscribe(
      data => {
        this.loading = _.assignIn({}, data);
        this.cd.markForCheck();
      }
    );
  }

}
