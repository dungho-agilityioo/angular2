import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/order/services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private orderService: OrderService
  ) {}
  ngOnInit() {
    this.orderService.getAndSetObservableOrder()
      .subscribe();
  }
}
