import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  loading$: Subject<{loading: boolean, hasError: boolean, hasMsg: string}>;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.loading$ = this.httpService.loading$;
  }

}
