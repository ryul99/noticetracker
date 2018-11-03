import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  private searchedCourse: Course[] = [
    { name: 'swpp', id: 1, code: 'A', time: [] },
    { name: 'sp', id: 2, code: 'B', time: [] },
    { name: 'pl', id: 3, code: 'C', time: [] },
    { name: 'es', id: 4, code: 'D', time: [] },
    { name: 'al', id: 5, code: 'E', time: [] },
    { name: 'cc', id: 6, code: 'F', time: [] },
    { name: 'os', id: 7, code: 'G', time: [] },
    { name: 'at', id: 8, code: 'H', time: [] }
  ];
  private searchedCourseSelected: boolean[] = [false, false, false];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private router: Router
  ) {}

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

  toggle(course: Course) {
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
}
