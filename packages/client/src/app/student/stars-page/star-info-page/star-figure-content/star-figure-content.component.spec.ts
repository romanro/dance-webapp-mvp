import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarFigureContentComponent } from './star-figure-content.component';

describe('StarFigureContentComponent', () => {
  let component: StarFigureContentComponent;
  let fixture: ComponentFixture<StarFigureContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarFigureContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarFigureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
