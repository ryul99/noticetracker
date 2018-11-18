import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from './article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpCourseUrl = 'api/course/';
  private httpArticleUrl = 'api/article/';

  constructor(private http: HttpClient) {}

  getNewsfeed() {}

  getArticleByCourseId(courseID: number): Observable<Article[]> {
    let url = this.httpCourseUrl + courseID + '/article';
    return this.http.get<Article[]>(url);
  }

  getMarkedArticles(userID: number) {}

  setStar(articleID: number) {}

  setIgnore(articleId: number) {}
}
