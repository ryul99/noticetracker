import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SiteRecommendationComponent } from './site-recommendation.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SiteRecommendationComponent', () => {
  let component: SiteRecommendationComponent;
  let fixture: ComponentFixture<SiteRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteRecommendationComponent],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
