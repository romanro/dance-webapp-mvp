/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarContentFiguresTabsListComponent } from './star-content-figures-tabs-list.component';

describe('StarContentFiguresTabsListComponent', () => {
  let component: StarContentFiguresTabsListComponent;
  let fixture: ComponentFixture<StarContentFiguresTabsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarContentFiguresTabsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarContentFiguresTabsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
