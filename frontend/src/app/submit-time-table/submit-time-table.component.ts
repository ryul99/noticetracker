import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mockCourses } from '../stub-services';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-submit-time-table',
  templateUrl: './submit-time-table.component.html',
  styleUrls: ['./submit-time-table.component.css']
})
export class SubmitTimeTableComponent implements OnInit {
  private nameTerm: string;
  private codeTerm: string;
  private selectedCourse: Course[] = [];
  private searchedCourse: Course[] = mockCourses;
  private searchedCourseSelected: boolean[] = [false, false, false];

  private viewAsList: boolean = true;

  constructor(private courseService: CourseService, private userService: UserService, private router: Router) {}

  ngOnInit() {}

  submit() {
    for (let course of this.selectedCourse) {
      this.userService.addCourse(course.id);
    }
    this.router.navigate(['/site_recommendation']);
  }

  skip() {
    this.router.navigate(['/newsfeed']);
  }

  searchByName() {
    this.courseService.searchByName(this.nameTerm);
  }

  searchByCode() {
    this.courseService.searchByCode(this.codeTerm);
  }

  goHome() {
    this.router.navigate(['/newsfeed']);
  }

  toggleOnSearchedList(course: Course) {
    const searchIndex: number = this.searchedCourse.indexOf(course);
    const selectIndex: number = this.selectedCourse.indexOf(course);

    if (selectIndex != -1) {
      this.selectedCourse.splice(selectIndex, 1);
      this.searchedCourseSelected[searchIndex] = false;
    } else {
      this.selectedCourse.push(course);
      this.searchedCourseSelected[searchIndex] = true;
    }
  }

  chooseListView() {
    this.viewAsList = true;
  }

  chooseTableView() {
    this.viewAsList = false;
  }
}
