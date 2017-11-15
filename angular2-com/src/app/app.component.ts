import { Component, ViewChild } from '@angular/core';
import { VotedComponent } from './voted/voted.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(VotedComponent)
  private voteComponent: VotedComponent;
  
  title = 'First App Angular2';
  agree = 0;
  disgree = 0;
  authors = ["Ms A", "Ms B", "Ms C"];


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
