import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {
  @Input() appName: string;
  constructor() { }

  ngOnInit() {
  }

}
