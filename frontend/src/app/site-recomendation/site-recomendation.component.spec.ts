import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRecomendationComponent } from './site-recomendation.component';

describe('SiteRecomendationComponent', () => {
  let component: SiteRecomendationComponent;
  let fixture: ComponentFixture<SiteRecomendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteRecomendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
