import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NewsfeedComponent } from './newsfeed.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
