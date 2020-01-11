/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarClassesComponent } from './star-classes.component';

describe('StarClassesComponent', () => {
  let component: StarClassesComponent;
  let fixture: ComponentFixture<StarClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
