import {
  Component,
  OnInit
} from '@angular/core';

import { environment } from 'env/environment';

@Component({
  selector: 'primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.css']
})
export class PrimaryLayoutComponent implements OnInit {
  appName: string;
  constructor() { }

  ngOnInit() {
    this.appName = environment.appName;
  }

}
