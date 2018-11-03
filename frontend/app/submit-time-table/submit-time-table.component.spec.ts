import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTimeTableComponent } from './submit-time-table.component';

describe('SubmitTimeTableComponent', () => {
  let component: SubmitTimeTableComponent;
  let fixture: ComponentFixture<SubmitTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
