import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor() {}

  getNewsfeed() {}

  getArticleByCourseId(courseID: number) {}

  getMarkedArticles(userID: number) {}

  setStar(articleID: number) {}

  setIgnore(articleId: number) {}
}
