/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InpageErrorComponent } from './inpage-error.component';

describe('InpageErrorComponent', () => {
  let component: InpageErrorComponent;
  let fixture: ComponentFixture<InpageErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpageErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
