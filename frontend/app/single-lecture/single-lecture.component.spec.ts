import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLectureComponent } from './single-lecture.component';

describe('SingleLectureComponent', () => {
  let component: SingleLectureComponent;
  let fixture: ComponentFixture<SingleLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
