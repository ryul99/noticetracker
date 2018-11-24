import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { User } from './user';
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

  addCourses(courseIds: number[]): Observable<boolean> {
    let url = '/user/course';
    return this.http.post<boolean>(url, {
      courses: courseIds
    });
  }

  addSites(siteIds: number[]): Observable<boolean> {
    let url = '/user/site';
    return this.http.post<boolean>(url, {
      sites: siteIds
    });
  }

  getTakingCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/user/' + this.userNumber + '/courses');
  }

  getUserNumber(): number {
    return this.userNumber;
  }

  getUserId(): string {
    return this.userId;
  }
}
