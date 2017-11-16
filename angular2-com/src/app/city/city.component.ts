import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities = [
    { id: 1, name: 'Da Nang' },
    { id: 2, name: 'Quang Nam' },
    { id: 3, name: 'Quang Ngai' }
  ];
  selectValue = '';
  selection2 = 0;
  message = '';

  constructor() { }

  ngOnInit() {
  }
  cityChanged() {
    console.log(this.selection2);
    this.message = 'City selected: ' + this.cities.find( x => x.id == this.selection2).name ;
  }

}
