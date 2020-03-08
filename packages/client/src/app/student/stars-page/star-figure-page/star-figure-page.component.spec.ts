/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarFigurePageComponent } from './star-figure-page.component';

describe('StarFigurePageComponent', () => {
  let component: StarFigurePageComponent;
  let fixture: ComponentFixture<StarFigurePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarFigurePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarFigurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
