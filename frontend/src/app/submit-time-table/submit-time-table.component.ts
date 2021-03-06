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
  nameTerm: string;
  codeTerm: string;
  selectedCourse: Course[] = [];
  searchedCourse: Course[] = [];
  searchedCourseSelected: boolean[] = [];

  viewAsList: boolean = true;
  removeActivated: boolean = false;

  constructor(private courseService: CourseService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.authorized().then(success => {
      if (!success) {
        this.router.navigate(['']);
      }
    });
    this.userService.getCourses().subscribe(courses => {
      this.selectedCourse = courses;
    });
  }

  submit() {
    this.userService.addCourses(this.selectedCourse).subscribe(() => {
      this.router.navigate(['/site_recommendation']);
    });
  }

  skip() {
    this.router.navigate(['/newsfeed']);
  }

  searchByName() {
    this.courseService.searchByName(this.nameTerm).subscribe(list => {
      this.searchedCourse = list;
      this.searchedCourseSelected = [];
      for (let item of list) {
        var isSelected: boolean = false;
        for (let course of this.selectedCourse) {
          if (course.id === item.id) {
            isSelected = true;
            break;
          }
        }
        if (isSelected) this.searchedCourseSelected.push(true);
        else this.searchedCourseSelected.push(false);
      }
    });
  }

  searchByCode() {
    this.courseService.searchByCode(this.codeTerm).subscribe(list => {
      this.searchedCourse = list;
      this.searchedCourseSelected = [];
      for (let item of list) {
        var isSelected: boolean = false;
        for (let course of this.selectedCourse) {
          if (course.id === item.id) {
            isSelected = true;
            break;
          }
        }
        if (isSelected) this.searchedCourseSelected.push(true);
        else this.searchedCourseSelected.push(false);
      }
    });
  }

  goHome() {
    this.router.navigate(['/newsfeed']);
  }

  toggleOnSearchedList(course: Course) {
    const searchIndex: number = this.searchedCourse.indexOf(course);

    if (!this.searchedCourseSelected[searchIndex]) {
      this.selectedCourse = this.selectedCourse.filter(c => c.id != course.id);
    } else {
      this.selectedCourse.push(course);
    }
  }

  chooseListView() {
    this.viewAsList = true;
  }

  chooseTableView() {
    this.viewAsList = false;
  }

  toggleDeleteButton() {
    this.removeActivated = !this.removeActivated;
  }

  removeCourse(course: Course) {
    this.selectedCourse = this.selectedCourse.filter(c => c !== course);
    let i: number = this.searchedCourse.indexOf(course);
    if (i > -1) {
      this.searchedCourseSelected[i] = false;
    }
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['']);
  }
}
