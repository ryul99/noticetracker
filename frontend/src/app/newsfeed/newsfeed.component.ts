import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Article } from '../article';
import { Course } from '../course';
import { mockCourses } from '../stub';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  timeTable: Course[] = mockCourses;
  newsfeed: Article[] = [
    { id: 1, url: 'https://www.naver.com/' },
    { id: 2, url: 'https://github.com/' },
    { id: 3, url: 'https://www.youtube.com/' },
    { id: 4, url: 'https://www.daum.net/' },
    { id: 5, url: 'https://www.google.com/' },
    { id: 6, url: 'https://stackoverflow.com/' }
  ];
  courseIdOfArticle: number[] = [1, 2, 3, 4, 5, 6];
  articleIsStar: boolean[] = [false, false, false, false, false, false];
  articleIsIgnore: boolean[] = [false, false, false, false, false, false];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

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

  star(article: Article) {
    let index = this.newsfeed.indexOf(article);
    this.articleIsStar[index] = true;
    this.articleIsIgnore[index] = false;
  }

  ignore(article: Article) {
    let index = this.newsfeed.indexOf(article);
    this.articleIsStar[index] = false;
    this.articleIsIgnore[index] = true;
  }
}
