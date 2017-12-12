import { FormatUrlImagePipe } from './pipes/format-url-image.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { PrimaryLayoutComponent } from './components/main-layout/primary-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const SHARED_COMPONENTS: any[] = [
  PrimaryLayoutComponent,
  MainHeaderComponent,
  MainFooterComponent
];

export const SHARED_PIPES: any[] = [
  TruncatePipe,
  FormatUrlImagePipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
],
  exports: [
    CommonModule,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
  ]
})
export class SharedModule { }
