import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mockCourses } from '../stub';
import { Course } from '../course';

@Component({
  selector: 'app-site-recommendation',
  templateUrl: './site-recommendation.component.html',
  styleUrls: ['./site-recommendation.component.css']
})
export class SiteRecommendationComponent implements OnInit {
  private courses: Course[] = mockCourses;
  private expanded: boolean[] = [];
  private urlToAdd: string[] = [];

  private siteIDList: number[] = [];
  private siteSelected: boolean[] = [];

  private initialized: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    for (let course of this.courses) {
      this.expanded.push(false);
      this.urlToAdd.push('');
      for (let site of course.sites) {
        this.siteIDList.push(site.id);
        this.siteSelected.push(false);
      }
    }

    this.initialized = true;
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
    course.sites.push({ id: 100, name: 'added', url: this.urlToAdd[index] });
  }
}
