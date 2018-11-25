import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { mockArticles } from './stub';

describe('ArticleService', () => {
  let httpMock: HttpTestingController;
  let service: ArticleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ArticleService);
  });

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });

  it('getArticlesByCourseId', () => {
    service.getArticlesByCourseId(3).subscribe(list => {});
    const req = httpMock.expectOne('api/course/3/article');
    expect(req.request.method).toBe('GET');
    req.flush([mockArticles[0], mockArticles[1]]);
  });

  it('getArticleByArticleId', () => {
    service.getArticleByArticleId(3).subscribe(list => {});
    const req = httpMock.expectOne('api/article/3');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles[0]);
  });
});
