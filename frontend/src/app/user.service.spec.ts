import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { mockCourses, mockSites, mockArticles } from './stub';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    this.service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('signIn', () => {
    let url = '/api/sign_in/';
    const req = httpMock.expectOne(url);
    service.signIn('minty', 'wow').then(success => {
      expect(req.request.method).toBe('GET');
      expect(service.userNumber).toBe(1);
      expect(service.userId).toBe('minty');
    });

    req.flush(true);
  });

  it('signOut', () => {
    let url = '/api/sign_out/';
    const req = httpMock.expectOne(url);
    service.signOut().then(success => {
      expect(req.request.method).toBe('GET');
      expect(service.userNumber).toBe(undefined);
      expect(service.userId).toBe(undefined);
    });
    req.flush(true);
  });

  it('signUp', () => {
    let url = '/api/sign_up';
    const req = httpMock.expectOne(url);
    service.signUp('minty', 'wow').then(() => {
      expect(req.request.method).toBe('POST');
      expect(service.userNumber).toBe(1);
      expect(service.userId).toBe('minty');
    });
    req.flush(true);
  });

  it('getCourses', () => {
    let url = '/api/user/course';
    const req = httpMock.expectOne(url);
    service.getCourses().subscribe(courses => {
      expect(req.request.method).toBe('GET');
      expect(courses).toBe([mockCourses[1], mockCourses[5]]);
    });
    req.flush([mockCourses[1], mockCourses[5]]);
  });

  it('getSites', () => {
    let url = '/api/user/site';
    const req = httpMock.expectOne(url);
    service.getSites().subscribe(sites => {
      expect(req.request.method).toBe('GET');
      expect(sites).toBe([mockSites[1], mockSites[3]]);
    });
    req.flush([mockSites[1], mockSites[3]]);
  });

  it('addCourses', () => {
    let url = '/api/user/course';
    const req = httpMock.expectOne(url);
    service.addCourses([2, 3]).subscribe(() => {
      expect(req.request.method).toBe('POST');
    });
    req.flush(true);
  });

  it('addSites', () => {
    let url = '/api/user/site';
    const req = httpMock.expectOne(url);
    service.addSites([2, 3]).subscribe(() => {
      expect(req.request.method).toBe('POST');
    });
    req.flush(true);
  });

  it('getNewsfeed', () => {
    let url = '/api/user/nesfeed' + 1;
    const req = httpMock.expectOne(url);
    service.getNewsfeed(1).subscribe(articles => {
      expect(req.request.method).toBe('GET');
      expect(articles).toBe([mockArticles[0], mockArticles[1]]);
    });
    req.flush([mockArticles[0], mockArticles[1]]);
  });

  it('updateArticle', () => {
    let url = '/api/user/article/' + 2;
    const req = httpMock.expectOne(url);
    service.updateArticle(mockArticles[1]).subscribe(() => {
      expect(req.request.method).toBe('PUT');
    });
    req.flush(true);
  });

  it('getUserNumber', () => {
    service.userNumber = 1;
    expect(service.getUserNumber()).toBe(service.userNumber);
  });

  it('getUserId', () => {
    service.userId = 'minty';
    expect(service.getUserId()).toBe(service.userId);
  });
});
