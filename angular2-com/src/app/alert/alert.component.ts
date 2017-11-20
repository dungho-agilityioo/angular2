import { Component, OnInit, Input, AfterContentInit, ContentChild, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() type = 'success';
  @ViewChildren('h1') h1;
  @ContentChild('insideNgContent') insideNgContent;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('H1 ', this.h1);
  }
  ngAfterContentInit() {
    console.log(this.insideNgContent);
  }

  alert() {
    console.log('alert');
  }
}
