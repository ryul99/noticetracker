import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: number;
  username: string;

  constructor() { }

  signIn(userId: number, password: string) {

  }

  signOut(userId: number) {

  }

  signUp(userId: number, password: string) {

  }

  addCourse(courseId: number) {

  }

  getTakingCourses() {

  }

  getUserId(): number {
    return 0;

  }

  getUserName(): string {
    return "";
  }
}
