import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../course';
import { Site } from '../site';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-site-recommendation',
  templateUrl: './site-recommendation.component.html',
  styleUrls: ['./site-recommendation.component.css']
})
export class SiteRecommendationComponent implements OnInit {
  courses: Course[];
  expanded: boolean[] = [];
  siteName: string[] = [];
  siteUrl: string[] = [];

  initialized: boolean = false;

  constructor(private router: Router, private userService: UserService, private courseService: CourseService) {}

  ngOnInit() {
    this.userService.authorized().then(success => {
      if (!success) {
        this.router.navigate(['']);
      }
    });
    this.userService.getCourses().subscribe(courses => {
      this.courses = courses;
      for (let course of this.courses) {
        this.expanded.push(false);
        this.siteUrl.push('');
        this.siteName.push('');
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
    let s: Site = { name: this.siteName[index], url: this.siteUrl[index], lastUpdated: new Date() };
    course.siteList.push({ name: this.siteName[index], url: this.siteUrl[index], lastUpdated: new Date() });
    this.siteName[index] = '';
    this.siteUrl[index] = '';
    this.userService.addSiteByCourseId(course, s).subscribe();
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['']);
  }
}
