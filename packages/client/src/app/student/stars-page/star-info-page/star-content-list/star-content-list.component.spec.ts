/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StarContentListComponent } from '../..';


describe('StarContentListComponent', () => {
  let component: StarContentListComponent;
  let fixture: ComponentFixture<StarContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarContentListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
