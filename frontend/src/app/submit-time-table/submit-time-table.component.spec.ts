import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SubmitTimeTableComponent } from './submit-time-table.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';
import { stubUserService, stubCourseService, mockCourses } from '../stub';

describe('SubmitTimeTableComponent', () => {
  let component: SubmitTimeTableComponent;
  let fixture: ComponentFixture<SubmitTimeTableComponent>;
  let courseService: CourseService;
  let userService: UserService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitTimeTableComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: CourseService, useValue: stubCourseService },
        { provide: UserService, useValue: stubUserService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    courseService = TestBed.get(CourseService);
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit', () => {
    spyOn(userService, 'addCourse');
    spyOn(router, 'navigate');
    component.selectedCourse = [mockCourses[0], mockCourses[4]];
    component.submit();
    expect(userService.addCourse).toHaveBeenCalledWith(mockCourses[0].id);
    expect(userService.addCourse).toHaveBeenCalledWith(mockCourses[4].id);
    expect(userService.addCourse).not.toHaveBeenCalledWith(mockCourses[1].id);
    expect(router.navigate).toHaveBeenCalledWith(['/site_recommendation']);
  });

  it('skip', () => {
    spyOn(router, 'navigate');
    component.skip();
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  it('searchByName', () => {
    spyOn(courseService, 'searchByName');
    component.nameTerm = '프로그래밍언어';
    component.searchByName();
    expect(courseService.searchByName).toHaveBeenCalledWith('프로그래밍언어');
  });

  it('searchByCode', () => {
    spyOn(courseService, 'searchByCode');
    component.codeTerm = '4190.310';
    component.searchByCode();
    expect(courseService.searchByCode).toHaveBeenCalledWith('4190.310');
  });

  it('goHome', () => {
    spyOn(router, 'navigate');
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  it('toggleOnSearchedList_not_selected', () => {
    component.searchedCourse = [mockCourses[0], mockCourses[1], mockCourses[2], mockCourses[3]];
    component.selectedCourse = [mockCourses[0], mockCourses[3]];
    component.toggleOnSearchedList(mockCourses[2]);
    expect(component.selectedCourse).toContain(mockCourses[2]);
    expect(component.searchedCourseSelected[2]).toBeTruthy();
  });

  it('toggleOnSearchedList_already_selected', () => {
    component.searchedCourse = [mockCourses[0], mockCourses[1], mockCourses[2], mockCourses[3]];
    component.selectedCourse = [mockCourses[0], mockCourses[3]];
    component.toggleOnSearchedList(mockCourses[3]);
    expect(component.selectedCourse).not.toContain(mockCourses[3]);
    expect(component.searchedCourseSelected[3]).toBeFalsy();
  });

  it('chooseListView', () => {
    component.chooseListView();
    expect(component.viewAsList).toBeTruthy();
  });

  it('chooseTableView', () => {
    component.chooseTableView();
    expect(component.viewAsList).toBeFalsy();
  });
});
