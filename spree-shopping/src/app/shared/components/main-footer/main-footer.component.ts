import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'main-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {
  @Input() appName: string;
  constructor() { }

  ngOnInit() {
  }

}
