import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarContentTabsComponent } from './star-content-tabs.component';

describe('StarContentTabsComponent', () => {
  let component: StarContentTabsComponent;
  let fixture: ComponentFixture<StarContentTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarContentTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarContentTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
