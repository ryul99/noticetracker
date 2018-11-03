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

  
  private nameTerm: string;
  private codeTerm: string;
  private selectedCourse: Course[] = [];
  private searchedCourse: [Course, boolean][] = [
    [{name:"swpp", id:1,code:"A",time:[]}, false],
    [{name:"sp", id:2,code:"B",time:[]}, false],
    [{name:"pl", id:3,code:"C",time:[]}, false], 
  ];


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
    const selectIndex: number = this.selectedCourse.indexOf(course[0]);
    const searchIndex: number = this.searchedCourse.indexOf(course);

    console.log(`${selectIndex} ${searchIndex}`);
    console.log(`${course[0].name}`)

    if(selectIndex != -1) {
      this.selectedCourse.splice(selectIndex, 1);
      this.searchedCourse[searchIndex][1]=false;
    }
    else {
      this.selectedCourse.push(course[0]);
      this.searchedCourse[searchIndex][1]=true;
    }
  }
}
