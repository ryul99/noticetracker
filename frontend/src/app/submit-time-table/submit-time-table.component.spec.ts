import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SubmitTimeTableComponent } from './submit-time-table.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';
import { mockUserService, mockCourseService, mockCourses } from '../mock';

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
        { provide: CourseService, useClass: mockCourseService },
        { provide: UserService, useClass: mockUserService }
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
    spyOn(userService, 'addCourses');
    spyOn(router, 'navigate');
    component.selectedCourse = [mockCourses[0], mockCourses[4]];
    component.submit();
    expect(userService.addCourses).toHaveBeenCalledWith([mockCourses[0].id, mockCourses[4].id]);
    expect(router.navigate).toHaveBeenCalledWith(['/site_recommendation']);
  });

  it('skip', () => {
    spyOn(router, 'navigate');
    component.skip();
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  it('searchByName', () => {
    spyOn(courseService, 'searchByName').and.callThrough();
    component.selectedCourse = [mockCourses[2]];
    component.nameTerm = '프로그래밍';
    component.searchByName();
    expect(courseService.searchByName).toHaveBeenCalledWith('프로그래밍');
    expect(component.searchedCourseSelected).toEqual([false, true]);
  });

  it('searchByCode', () => {
    spyOn(courseService, 'searchByCode').and.callThrough();
    component.selectedCourse = [mockCourses[1], mockCourses[2]];
    component.codeTerm = '4190';
    component.searchByCode();
    expect(courseService.searchByCode).toHaveBeenCalledWith('4190');
    expect(component.searchedCourseSelected).toEqual([true, false, false, false]);
  });

  it('goHome', () => {
    spyOn(router, 'navigate');
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/newsfeed']);
  });

  it('toggleOnSearchedList_not_selected', () => {
    component.searchedCourse = [mockCourses[0], mockCourses[1], mockCourses[2], mockCourses[3]];
    component.selectedCourse = [mockCourses[0], mockCourses[3]];
    component.searchedCourseSelected = [true, false, true, true];
    component.toggleOnSearchedList(mockCourses[2]);
    expect(component.selectedCourse).toContain(mockCourses[2]);
  });

  it('toggleOnSearchedList_already_selected', () => {
    component.searchedCourse = [mockCourses[0], mockCourses[1], mockCourses[2], mockCourses[3]];
    component.selectedCourse = [mockCourses[0], mockCourses[3]];
    component.searchedCourseSelected = [true, false, false, false];
    component.toggleOnSearchedList(mockCourses[3]);
    expect(component.selectedCourse).not.toContain(mockCourses[3]);
  });

  it('chooseListView', () => {
    component.chooseListView();
    expect(component.viewAsList).toBeTruthy();
  });

  it('chooseTableView', () => {
    component.chooseTableView();
    expect(component.viewAsList).toBeFalsy();
  });

  it('toggleDeleteButton', () => {
    component.toggleDeleteButton();
    expect(component.removeActivated).toBeTruthy();

    component.toggleDeleteButton();
    expect(component.removeActivated).toBeFalsy();
  });

  it('removeCourse', () => {
    component.selectedCourse = [mockCourses[0], mockCourses[1]];
    component.searchedCourse = [mockCourses[0], mockCourses[2]];
    component.searchedCourseSelected = [true, false];
    component.removeCourse(mockCourses[0]);
    expect(component.selectedCourse).toEqual([mockCourses[1]]);
    expect(component.searchedCourse).toEqual([mockCourses[0], mockCourses[2]]);
    expect(component.searchedCourseSelected).toEqual([false, false]);
  });
});
