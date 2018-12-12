import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Article } from '../article';
import { Course } from '../course';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  courses: Course[];
  newsfeed: Article[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.authorized().then(success => {
      if (!success) {
        this.router.navigate(['']);
      }
    });

    this.userService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.userService.getNewsfeed().subscribe(newsfeed => {
      this.newsfeed = newsfeed;
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
