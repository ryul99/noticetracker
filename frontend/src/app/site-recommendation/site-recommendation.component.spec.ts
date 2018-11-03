import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRecommendationComponent } from './site-recommendation.component';

describe('SiteRecommendationComponent', () => {
  let component: SiteRecommendationComponent;
  let fixture: ComponentFixture<SiteRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteRecommendationComponent]
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
