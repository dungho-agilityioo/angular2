import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VotedComponent } from './voted/voted.component';
import { CityComponent } from './city/city.component';

@NgModule({
  declarations: [
    AppComponent,
    VotedComponent,
    CityComponent
],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
