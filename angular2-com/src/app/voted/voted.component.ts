import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-voted',
  templateUrl: './voted.component.html',
  styleUrls: ['./voted.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class VotedComponent implements OnInit {
  @Input() author: string;
  @Output() onVoted = new EventEmitter<boolean>();
  voted = false;
  constructor() { }

  ngOnInit() {
  }

  vote(agree: boolean) {
    this.voted = true;
    this.onVoted.emit(agree);
  }

  changeAuthor(author) {
    this.author = author;
  }
}
