import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { mockCourses } from './mock';

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
    service.searchByCode('M1522').subscribe(() => {});
    const req = httpMock.expectOne('api/search/code/M1522');
    expect(req.request.method).toBe('GET');
    req.flush([mockCourses[0], mockCourses[1]]);
  });

  it('searchByName', () => {
    service.searchByName('프로그래밍').subscribe(() => {});
    const req = httpMock.expectOne('api/search/name/프로그래밍');
    expect(req.request.method).toBe('GET');
    req.flush([mockCourses[1], mockCourses[2]]);
  });

  it('getCourseObjectById', () => {
    service.getCourseObjectById(5).subscribe(() => {});
    const req = httpMock.expectOne('api/course/5');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[4]);
  });

  it('getRecommendedSitesById', () => {
    service.getRecommendedSitesById(3).subscribe(() => {});
    const req = httpMock.expectOne('api/course/3/site/');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[2]);
  });

  it('deleteSiteById', () => {
    service.deleteSiteById(3, 7).subscribe(() => {});
    const req = httpMock.expectOne('api/course/3/site/7');
    expect(req.request.method).toBe('DELETE');
    req.flush([true]);
  });

  it('addSiteByCourseId', () => {
    service.addSiteByCourseId(3, mockCourses[4].siteList[0]).subscribe(() => {});
    const req = httpMock.expectOne('api/course/3/site/');
    expect(req.request.method).toBe('POST');
    req.flush(mockCourses[2].siteList.concat(mockCourses[4].siteList[0]));
  });
});
