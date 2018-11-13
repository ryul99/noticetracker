import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Course } from './course';
import { CourseService } from './course.service';
import { mockCourses } from './stub';

describe('CourseService', () => {
  let httpMock: HttpTestingController;
  let service: CourseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(CourseService);
  });

  it('should be created', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service).toBeTruthy();
  });

  it('searchByCode', () => {
    service.searchByCode('M1522').subscribe(list => {});
    const req = httpMock.expectOne('api/search/id/M1522');
    expect(req.request.method).toBe('GET');
    req.flush([mockCourses[0], mockCourses[1]]);
  });

  it('searchByName', () => {
    service.searchByName('프로그래밍').subscribe(list => {});
    const req = httpMock.expectOne('api/search/name/프로그래밍');
    expect(req.request.method).toBe('GET');
    req.flush([mockCourses[1], mockCourses[2]]);
  });

  it('getCourseObjectById', () => {
    service.getCourseObjectById(5).subscribe(obj => {});
    const req = httpMock.expectOne('api/course/5');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[4]);
  });

  it('getRecommendedSitesById', () => {
    service.getRecommendedSitesById(3).subscribe(list => {});
    const req = httpMock.expectOne('api/course/3/site');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[2]);
  });

  it('addSiteByCourseId', () => {
    service.addSiteByCourseId(3, mockCourses[4].sites[0]).subscribe(list => {});
    const req = httpMock.expectOne('api/course/3/site');
    expect(req.request.method).toBe('POST');
    req.flush(mockCourses[2].sites.concat(mockCourses[4].sites[0]));
  });
});
