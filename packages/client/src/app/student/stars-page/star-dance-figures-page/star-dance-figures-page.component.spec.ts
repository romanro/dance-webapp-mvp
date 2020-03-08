/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarDanceFiguresPageComponent } from './star-dance-figures-page.component';

describe('StarDanceFiguresPageComponent', () => {
  let component: StarDanceFiguresPageComponent;
  let fixture: ComponentFixture<StarDanceFiguresPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarDanceFiguresPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarDanceFiguresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
