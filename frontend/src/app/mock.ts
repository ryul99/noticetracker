import { Course } from './course';
import { Site } from './site';
import { Article } from './article';
import { User } from './user';
import { of } from 'rxjs';

export const mockCourses: Course[] = [
  {
    name: '소프트웨어 개발의 원리와 실습',
    id: 1,
    lectureCode: 'M1522.002400',
    time: [{ day: 2, start: 95, end: 110 }, { day: 3, start: 185, end: 205 }, { day: 4, start: 95, end: 110 }],
    profName: '전병곤',
    classNumber: 1,
    sites: [
      { id: 1, name: 'GitHub', url: 'https://github.com/swsnu/swppfall2018' },
      { id: 2, name: 'SNU eTL', url: 'http://etl.snu.ac.kr/course/view.php?id=146803' }
    ]
  },
  {
    name: '시스템프로그래밍',
    id: 2,
    lectureCode: 'M1522.000800',
    time: [{ day: 1, start: 170, end: 185 }, { day: 1, start: 185, end: 205 }, { day: 3, start: 170, end: 185 }],
    profName: 'Bernhard Egger',
    classNumber: 1,
    sites: [{ id: 3, name: 'SNU eTL', url: 'http://etl.snu.ac.kr/course/view.php?id=147656' }]
  },
  {
    name: '프로그래밍언어',
    id: 3,
    lectureCode: '4190.310',
    time: [{ day: 2, start: 110, end: 125 }, { day: 4, start: 110, end: 125 }],
    profName: '이광근',
    classNumber: 1,
    sites: [
      { id: 4, name: 'PL Website', url: 'https://ropas.snu.ac.kr/~kwang/4190.310/18/' },
      { id: 5, name: 'PL Webboard', url: 'https://ropas.snu.ac.kr/phpbb/viewforum.php?f=47' }
    ]
  },
  {
    name: '이산수학',
    id: 4,
    lectureCode: '4190.101',
    time: [{ day: 1, start: 140, end: 155 }, { day: 3, start: 140, end: 155 }],
    profName: '서진욱',
    classNumber: 2,
    sites: [{ id: 6, name: 'SNU eTL', url: 'http://etl.snu.ac.kr/course/view.php?id=146803' }]
  },
  {
    name: '오토마타이론',
    id: 5,
    lectureCode: '4190.306',
    time: [{ day: 2, start: 155, end: 170 }, { day: 4, start: 155, end: 170 }],
    profName: '박근수',
    classNumber: 1,
    sites: [{ id: 7, name: 'Automata Bulletin Board', url: 'http://theory.snu.ac.kr/?page_id=1388' }]
  },
  {
    name: '컴퓨터공학세미나',
    id: 6,
    lectureCode: '4190.209',
    time: [{ day: 3, start: 130, end: 140 }],
    profName: '신영길',
    classNumber: 1,
    sites: [] // for testing empty-list
  }
];

export const mockSites: Site[] = [
  { id: 1, name: 'GitHub', url: 'https://github.com/swsnu/swppfall2018' },
  { id: 2, name: 'SNU eTL', url: 'http://etl.snu.ac.kr/course/view.php?id=146803' },
  { id: 3, name: 'SNU eTL', url: 'http://etl.snu.ac.kr/course/view.php?id=147656' },
  { id: 4, name: 'PL Website', url: 'https://ropas.snu.ac.kr/~kwang/4190.310/18/' },
  { id: 5, name: 'PL Webboard', url: 'https://ropas.snu.ac.kr/phpbb/viewforum.php?f=47' },
  { id: 6, name: 'SNU eTL', url: 'http://etl.snu.ac.kr/course/view.php?id=146803' },
  { id: 7, name: 'Automata Bulletin Board', url: 'http://theory.snu.ac.kr/?page_id=1388' }
];

export const mockArticles: Article[] = [
  Object.assign(new Article(), {
    id: 1,
    course: mockCourses[0],
    content: mockCourses[0].name,
    url: 'https://www.naver.com/',
    star: true,
    ignore: false
  }),
  Object.assign(new Article(), {
    id: 2,
    course: mockCourses[1],
    content: mockCourses[1].name,
    url: 'https://github.com/',
    star: true,
    ignore: false
  }),
  Object.assign(new Article(), {
    id: 3,
    course: mockCourses[2],
    content: mockCourses[2].name,
    url: 'https://www.youtube.com/',
    star: false,
    ignore: false
  }),
  Object.assign(new Article(), {
    id: 4,
    course: mockCourses[3],
    content: mockCourses[3].name,
    url: 'https://www.daum.net/',
    star: false,
    ignore: true
  }),
  Object.assign(new Article(), {
    id: 5,
    course: mockCourses[4],
    content: mockCourses[4].name,
    url: 'https://www.google.com/',
    star: false,
    ignore: false
  })
];

export const mockUsers: User[] = [
  { id: 1, userId: 'minty' },
  { id: 2, userId: '16silver' },
  { id: 3, userId: 'MountGuy' },
  { id: 4, userId: 'ryul99' }
];

export class mockUserService {
  authorized() {
    return true;
  }

  signIn(username: string, pw: string) {
    return of(true).toPromise();
  }

  signOut() {
    return of(true).toPromise();
  }

  signUp(username: string, password: string) {
    return of(true).toPromise();
  }

  getCourses() {
    return of([mockCourses[1], mockCourses[2]]);
  }

  addCourses(courses: Course[]) {
    return of(courses);
  }

  getNewsfeed(pageNumber: number) {
    return;
  }

  updateArticle(article: Article) {
    return of(article);
  }

  getUserNumber() {
    return 1;
  }

  getUserId() {
    return 'minty99';
  }
}

export class mockCourseService {
  searchByCode(courseCode: string) {
    var list: Course[] = [];
    for (var i = 0; i < 6; i++) {
      if (mockCourses[i].lectureCode.includes(courseCode)) list.push(mockCourses[i]);
    }
    return of(list);
  }

  searchByName(courseName: string) {
    var list: Course[] = [];
    for (var i = 0; i < 6; i++) {
      if (mockCourses[i].name.includes(courseName)) list.push(mockCourses[i]);
    }
    return of(list);
  }

  getCourseObjectById(courseId: number) {
    return;
  }

  getRecommendedSitesById(courseId: number) {
    return;
  }

  addSiteByCourseId(courseId: number, site: Site) {
    return;
  }
}
