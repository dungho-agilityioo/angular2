import {
  Component,
  OnInit
} from '@angular/core';

import * as userConfig from 'app/user/user-config';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit {
  userOrderUrl: string;

  constructor() { }

  ngOnInit() {
    this.userOrderUrl = userConfig.PATH_NAME.USER_ORDER;
  }

}
