import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string;
  username: string;

  constructor() { }

  signIn(userId: string, password: string) {

  }

  signOut(userId: string) {

  }

  signUp(userId: string, password: string) {

  }

  addCourse(courseId: number) {

  }

  getTakingCourses() {

  }

  getUserId(): string {
    return "";

  }

  getUserName(): string {
    return "";
  }
}
