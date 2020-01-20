/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarPagesNavigationBarComponent } from './star-pages-navigation-bar.component';

describe('StarPagesNavigationBarComponent', () => {
  let component: StarPagesNavigationBarComponent;
  let fixture: ComponentFixture<StarPagesNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPagesNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPagesNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
