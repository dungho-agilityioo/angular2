import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  loading: any;
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.loading$.subscribe(
      data => this.loading = data
    );
  }

}
