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

  getArticlesByCourseId(courseId: number): Observable<Article[]> {
    let url = this.httpCourseUrl + courseId + '/article';
    return this.http.get<Article[]>(url);
  }

  getArticleByArticleId(articleId: number): Observable<Article> {
    let url = this.httpArticleUrl + articleId;
    return this.http.get<Article>(url);
  }
}
