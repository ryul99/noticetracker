import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticlesByCourseId(courseId: number): Observable<Article[]> {
    let url = 'api/course/' + courseId + '/article/';
    return this.http.get<Article[]>(url);
  }

  getArticleByArticleId(articleId: number): Observable<Article> {
    let url = 'api/article/' + articleId;
    return this.http.get<Article>(url);
  }
}
