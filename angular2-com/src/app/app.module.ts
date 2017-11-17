import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VotedComponent } from './voted/voted.component';
import { CityComponent } from './city/city.component';
import { TransclusionComponent } from './transclusion/transclusion.component';
import { CountryComponent } from './country/country.component';
import { SpecialSelectorComponent } from './special-selector/special-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    VotedComponent,
    CityComponent,
    TransclusionComponent,
    CountryComponent,
    SpecialSelectorComponent
],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
