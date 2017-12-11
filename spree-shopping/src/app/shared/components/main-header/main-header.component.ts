import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @Input() appName: string;
  constructor() { }

  ngOnInit() {
  }

}
