import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SubmitTimeTableComponent } from './submit-time-table.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubmitTimeTableComponent', () => {
  let component: SubmitTimeTableComponent;
  let fixture: ComponentFixture<SubmitTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitTimeTableComponent],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
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
