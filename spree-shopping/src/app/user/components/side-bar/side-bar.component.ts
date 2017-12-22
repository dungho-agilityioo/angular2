import {
  Component,
  OnInit
} from '@angular/core';

import {
  UserConfigService
} from 'app/user/services/user-config.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit {
  userOrderUrl: string;

  constructor(
    private userConfig: UserConfigService
  ) { }

  ngOnInit() {
    this.userOrderUrl = this.userConfig.PATH_NAME.USER_ORDER;
    console.log('rul ', this.userOrderUrl);
  }

}
