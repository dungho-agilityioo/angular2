import { IpService } from './ip.service';
import { AlertComponent } from './alert/alert.component';
import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef, ContentChild, OnInit } from '@angular/core';
import { VotedComponent } from './voted/voted.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'First App Angular2';
  agree = 0;
  ip: string;
  disgree = 0;
  authors = ['Ms A', 'Ms B', 'Ms C'];
  dataName = '';
  @ViewChildren(AlertComponent, {read: ElementRef}) alers: QueryList<AlertComponent>;
  @ViewChild(VotedComponent)
  private voteComponent: VotedComponent;

  constructor(private ipService: IpService) {}
  ngAfterViewInit() {
    this.alers.forEach(alerInstance => console.log(alerInstance));
  }
  ngOnInit(): void {
    this.ipService.getIp()
    .then(ip => this.ip = ip);
  }
  counterVoted(agree) {
    if (agree) {
      this.agree++;
    } else {
      this.disgree++;
    }
  }

  changeName(event) {
    this.voteComponent.changeAuthor(event.target.value);
  }
}
