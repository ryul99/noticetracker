import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { mockCourses, mockSites, mockArticles, mockUsers } from './stub';

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
    const service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('signIn', async(() => {
    let url = '/api/sign_in';
    service.signIn('minty', 'wow').then(() => {
      expect(req.request.method).toEqual('POST');
      expect(service.userNumber).toEqual(1);
      expect(service.userId).toEqual('minty');
    });
    const req = httpMock.expectOne(url);
    req.flush(mockUsers[0]);
  }));

  it('signOut', () => {
    let url = '/api/sign_out';
    service.signOut().then(success => {
      expect(req.request.method).toEqual('GET');
      expect(service.userNumber).toEqual(undefined);
      expect(service.userId).toEqual(undefined);
    });
    const req = httpMock.expectOne(url);
    req.flush([true]);
  });

  it('signUp', () => {
    let url = '/api/sign_up';
    service.signUp('minty', 'wow').then(() => {
      expect(req.request.method).toEqual('POST');
      expect(service.userNumber).toEqual(1);
      expect(service.userId).toEqual('minty');
    });
    const req = httpMock.expectOne(url);
    req.flush(mockUsers[0]);
  });

  it('getCourses', () => {
    let url = '/api/user/course';
    service.getCourses().subscribe(courses => {
      expect(req.request.method).toEqual('GET');
      expect(courses).toEqual([mockCourses[1], mockCourses[5]]);
    });
    const req = httpMock.expectOne(url);
    req.flush([mockCourses[1], mockCourses[5]]);
  });

  it('getSites', () => {
    let url = '/api/user/site';
    service.getSites().subscribe(sites => {
      expect(req.request.method).toEqual('GET');
      expect(sites).toEqual([mockSites[1], mockSites[3]]);
    });
    const req = httpMock.expectOne(url);
    req.flush([mockSites[1], mockSites[3]]);
  });

  it('addCourses', () => {
    let url = '/api/user/course';
    service.addCourses([2, 3]).subscribe(() => {
      expect(req.request.method).toEqual('POST');
    });
    const req = httpMock.expectOne(url);
    req.flush([true]);
  });

  it('addSites', () => {
    let url = '/api/user/site';
    service.addSites([2, 3]).subscribe(() => {
      expect(req.request.method).toEqual('POST');
    });
    const req = httpMock.expectOne(url);
    req.flush([true]);
  });

  it('getNewsfeed', () => {
    let url = '/api/user/newsfeed/' + 1;
    service.getNewsfeed(1).subscribe(articles => {
      expect(req.request.method).toEqual('GET');
      expect(articles).toEqual([mockArticles[0], mockArticles[1]]);
    });
    const req = httpMock.expectOne(url);
    req.flush([mockArticles[0], mockArticles[1]]);
  });

  it('updateArticle', () => {
    let url = '/api/user/article/' + 2;
    service.updateArticle(mockArticles[1]).subscribe(() => {
      expect(req.request.method).toEqual('PUT');
    });
    const req = httpMock.expectOne(url);
    req.flush([true]);
  });

  it('getUserNumber', () => {
    service.userNumber = 1;
    expect(service.getUserNumber()).toEqual(service.userNumber);
  });

  it('getUserId', () => {
    service.userId = 'minty';
    expect(service.getUserId()).toEqual(service.userId);
  });
});
