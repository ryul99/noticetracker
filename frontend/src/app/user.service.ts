import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { Site } from './site';
import { User } from './user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userNumber: number;
  username: string;

  constructor(private http: HttpClient) {}

  //signIn(userId: string, password: string) {}

  signIn(userId: string, password: string): Promise<boolean> {
    return this.http
      .post<User>('/api/sign_in/', {
        email: userId,
        password: password
      })
      .toPromise()
      .then(
        user => {
          this.username = user.username;
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
        email: userId,
        password: password
      })
      .toPromise()
      .then(
        user => {
          this.username = user.username;
          this.userNumber = user.id;
          return true;
        },
        error => {
          return false;
        }
      );
  }
  addCourse(courseId: number) {}

  getTakingCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/user/' + this.userNumber + '/courses');
  }

  getUserId(): number {
    return this.userNumber;
  }

  getUserName(): string {
    return this.username;
  }
}
