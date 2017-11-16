/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransclusionComponent } from './transclusion.component';

describe('TransclusionComponent', () => {
  let component: TransclusionComponent;
  let fixture: ComponentFixture<TransclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
