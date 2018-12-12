import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Article } from '../article';
import { Course } from '../course';
import { mockCourses, mockArticles } from '../mock';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  timeTable: Course[] = mockCourses;
  newsfeed: Article[] = mockArticles;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.authorized().then(success => {
      if (!success) {
        this.router.navigate(['']);
      }
    });
  }

  submitTimeTable() {
    this.router.navigate(['/submit_time_table']);
  }

  siteRecommendation() {
    this.router.navigate(['/site_recommendation']);
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['']);
  }

  toggleStar(article: Article) {
    article.toggleStar();
  }

  setIgnore(article: Article) {
    article.toggleIgnore();
  }
}
