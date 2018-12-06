import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mockCourses } from '../mock';
import { Course } from '../course';
import { UserService } from '../user.service';

@Component({
  selector: 'app-site-recommendation',
  templateUrl: './site-recommendation.component.html',
  styleUrls: ['./site-recommendation.component.css']
})
export class SiteRecommendationComponent implements OnInit {
  courses: Course[];
  expanded: boolean[] = [];
  urlToAdd: string[] = [];

  initialized: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    if (!this.userService.authorized()) this.router.navigate(['']);
    this.userService.getCourses().subscribe(courses => {
      this.courses = courses;
      for (let course of this.courses) {
        this.expanded.push(false);
        this.urlToAdd.push('');
      }

      this.initialized = true;
    });
  }

  expand() {}

  confirm() {
    this.router.navigate(['/newsfeed']);
  }

  back() {
    this.router.navigate(['/submit_time_table']);
  }

  goHome() {
    this.router.navigate(['/newsfeed']);
  }

  toggleExpand(course: Course) {
    let index: number = this.courses.indexOf(course);
    this.expanded[index] = !this.expanded[index];
  }

  addUrl(course: Course) {
    let index: number = this.courses.indexOf(course);
    course.siteList.push({ name: 'added', url: this.urlToAdd[index], lastUpdated: new Date() });
  }
}
