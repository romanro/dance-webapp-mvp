/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarSkillViewComponent } from './star-skill-view.component';

describe('StarSkillViewComponent', () => {
  let component: StarSkillViewComponent;
  let fixture: ComponentFixture<StarSkillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarSkillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarSkillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
