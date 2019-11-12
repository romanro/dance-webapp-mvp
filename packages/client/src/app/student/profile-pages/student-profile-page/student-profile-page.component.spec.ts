/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentProfilePageComponent } from './student-profile-page.component';

describe('StudentProfilePageComponent', () => {
  let component: StudentProfilePageComponent;
  let fixture: ComponentFixture<StudentProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
