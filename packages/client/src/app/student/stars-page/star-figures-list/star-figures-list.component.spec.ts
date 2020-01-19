/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarFiguresListComponent } from './star-figures-list.component';

describe('StarFiguresListComponent', () => {
  let component: StarFiguresListComponent;
  let fixture: ComponentFixture<StarFiguresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarFiguresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarFiguresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
