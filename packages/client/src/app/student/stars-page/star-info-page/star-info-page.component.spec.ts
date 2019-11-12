/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarInfoPageComponent } from './star-info-page.component';

describe('StarInfoPageComponent', () => {
  let component: StarInfoPageComponent;
  let fixture: ComponentFixture<StarInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
