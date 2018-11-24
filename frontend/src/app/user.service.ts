import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { Site } from './site';
import { User } from './user';
import { Article } from './article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userNumber: number;
  userId: string;

  constructor(private http: HttpClient) {}

  signIn(userId: string, password: string): Promise<boolean> {
    return this.http
      .post<User>('/api/sign_in/', {
        userId: userId,
        password: password
      })
      .toPromise()
      .then(
        user => {
          this.userId = user.userId;
          this.userNumber = user.id;
          return true;
        },
        error => {
          return false;
        }
      );
  }

  signOut(): Promise<boolean> {
    return this.http.get<boolean>('/api/sign_out/').toPromise();
  }

  signUp(userId: string, password: string): Promise<boolean> {
    return this.http
      .post<User>('/api/sign_up/', {
        userId: userId,
        password: password
      })
      .toPromise()
      .then(
        user => {
          this.userId = user.userId;
          this.userNumber = user.id;
          return true;
        },
        error => {
          return false;
        }
      );
  }

  getCourses(userNumber: number): Observable<Course[]> {
    let url = '/api/user/course';
    return this.http.get<Course[]>(url);
  }

  getSites(userNumber: number): Observable<Site[]> {
    let url = '/api/user/site';
    return this.http.get<Site[]>(url);
  }

  addCourses(courseIds: number[]): Observable<boolean> {
    let url = '/api/user/course';
    return this.http.post<boolean>(url, {
      courses: courseIds
    });
  }

  addSites(siteIds: number[]): Observable<boolean> {
    let url = '/api/user/site';
    return this.http.post<boolean>(url, {
      sites: siteIds
    });
  }

  getNewsfeed(userNumber: number, pageNumber: number): Observable<Site[]> {
    let url = '/api/user/newsfeed/' + pageNumber;
    return this.http.get<Site[]>(url);
  }

  updateArticle(article: Article): Observable<boolean> {
    let url = '/api/user/article/' + article.id;
    return this.http.put<boolean>(url, {
      article: article
    });
  }

  getUserNumber(): number {
    return this.userNumber;
  }

  getUserId(): string {
    return this.userId;
  }
}
