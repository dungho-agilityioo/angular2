import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'main-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @Input() appName: string;
  constructor() { }

  ngOnInit() {
  }

}
