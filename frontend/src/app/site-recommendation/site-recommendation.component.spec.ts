import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SiteRecommendationComponent } from './site-recommendation.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';
import { mockCourses, mockUserService, mockCourseService } from '../mock';

describe('SiteRecommendationComponent', () => {
  let component: SiteRecommendationComponent;
  let fixture: ComponentFixture<SiteRecommendationComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteRecommendationComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: UserService, useClass: mockUserService },
        { provide: CourseService, useClass: mockCourseService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expand', () => {
    component.expand();
  });

  it('confirm', () => {
    spyOn(router, 'navigate');
    component.confirm();
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  it('back', () => {
    spyOn(router, 'navigate');
    component.back();
    expect(router.navigate).toHaveBeenCalledWith(['/submit_time_table']);
  });

  it('goHome', () => {
    spyOn(router, 'navigate');
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  it('toggleExpand', () => {
    // TODO: update tests
    // component.toggleExpand(mockCourses[2]);
    // expect(component.expanded[2]).toBeTruthy();
    // component.toggleExpand(mockCourses[1]);
    // expect(component.expanded[1]).toBeTruthy();
    // component.toggleExpand(mockCourses[1]);
    // expect(component.expanded[1]).toBeFalsy();
    // component.toggleExpand(mockCourses[2]);
    // expect(component.expanded[2]).toBeFalsy();
  });

  it('addUrl', () => {
    // TODO: real test
  });
});
