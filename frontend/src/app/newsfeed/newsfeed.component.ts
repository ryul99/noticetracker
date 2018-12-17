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
      this.newsfeed = newsfeed.sort((a: Article, b: Article) => {
        var updA: Date = a.updated;
        var updB: Date = b.updated;
        var timeA = new Date(updA).getTime();
        var timeB = new Date(updB).getTime();
        var diff = Math.abs(timeA - timeB);
        if (diff < 3000) return 0;
        return timeB - timeA;
      });
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
    article.star = !article.star;
    this.userService.updateArticle(article).subscribe();
  }

  setIgnore(article: Article) {
    article.ignore = !article.ignore;
    this.userService.updateArticle(article).subscribe();
  }
}
