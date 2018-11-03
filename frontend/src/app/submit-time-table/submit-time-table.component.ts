import { Component, OnInit } from '@angular/core';

import { Course } from '../course';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-submit-time-table',
  templateUrl: './submit-time-table.component.html',
  styleUrls: ['./submit-time-table.component.css']
})
export class SubmitTimeTableComponent implements OnInit {

  selectedCourse: Course[];
  searchedCourse: [Course, boolean][] = [
    [{name:"swpp", id:1,code:"A",time:[]}, false],
    [{name:"sp", id:1,code:"B",time:[]}, false],
    [{name:"pl", id:1,code:"C",time:[]}, false],
  ]

  nameTerm: string;
  codeTerm: string;


  constructor(
    private courseService: CourseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  submit() {
    for(let course of this.selectedCourse) {
      this.userService.addCourse(course.id);
    }
  }

  skip() {

  }

  searchByName() {
    this.courseService.searchByName(this.nameTerm);
  }

  searchByCode() {
    this.courseService.searchByCode(this.codeTerm);
  }

  goHome() {

  }

  toggle(course: [Course, boolean]) {
    const index: number = this.selectedCourse.indexOf(course[0]);

    if(index != -1) {
      this.selectedCourse.splice(index, 1);
      this.searchedCourse[index][1]=false;
    }
    else {
      this.selectedCourse.push(course[0]);
      this.searchedCourse[index][1]=true;
    }
  }

}
