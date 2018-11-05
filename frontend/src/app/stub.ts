import { Course } from './course';

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

export const stubCourseService = {
  searchByCode: function(courseCode: string) {
    return;
  },

  searchByName: function(name: string) {
    return;
  },

  getCourseObjectById: function(courseId: number) {
    return;
  },

  getRecommendedSitesById: function(courseId: number) {
    return;
  },

  addRecommendSite: function(courseId: number, site: Site) {
    return;
  }
};
