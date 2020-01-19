/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarDancesListComponent } from './star-dances-list.component';

describe('StarDancesListComponent', () => {
  let component: StarDancesListComponent;
  let fixture: ComponentFixture<StarDancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarDancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarDancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
