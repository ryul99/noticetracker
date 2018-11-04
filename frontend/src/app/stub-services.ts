import { Course } from './course';

export const mockCourses: Course[] = [
  {
    name: 'swpp',
    id: 1,
    lectureCode: 'A',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'sp',
    id: 2,
    lectureCode: 'B',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'pl',
    id: 3,
    lectureCode: 'C',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'es',
    id: 4,
    lectureCode: 'D',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'al',
    id: 5,
    lectureCode: 'E',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'cc',
    id: 6,
    lectureCode: 'F',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'os',
    id: 7,
    lectureCode: 'G',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  },
  {
    name: 'at',
    id: 8,
    lectureCode: 'H',
    time: [],
    profName: 'CBG',
    classNumber: 1,
    sites: []
  }
];

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
