import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { Site } from './site';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string;
  username: string;

  constructor(private http: HttpClient) {}

  signIn(userId: string, password: string) {}

  signOut() {}

  signUp(userId: string, password: string) {}

  addCourse(courseId: number) {}

  getTakingCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('asdf');
  }

  getUserId(): string {
    return '';
  }

  getUserName(): string {
    return '';
  }
}
