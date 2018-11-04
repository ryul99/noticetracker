import { Course } from './course';

export const c1: Course = {
  name: 'PL',
  id: 1,
  code: '4190.310',
  time: [{ day: 2, start: 110, end: 125 }, { day: 4, start: 110, end: 125 }]
};

export const stubUserService = {
  signIn: function(username: string, pw: string) {
    return;
  },
  signOut: function(username: string) {
    return;
  },
  signUp: function(username: string, pw: string) {
    return;
  },
  addCourse: function(courseId: string) {
    return;
  },
  getTakingCourses: function() {
    return;
  }
};
