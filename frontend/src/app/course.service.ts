import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { Site } from './site';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  searchByCode(courseCode: string): Observable<Course[]> {
    let url = 'api/search/id/' + courseCode;
    return this.http.get<Course[]>(url);
  }

  searchByName(courseName: string): Observable<Course[]> {
    let url = 'api/search/name/' + courseName;
    return this.http.get<Course[]>(url);
  }

  getCourseObjectById(courseId: number): Observable<Course> {
    let url = 'api/course/' + courseId;
    return this.http.get<Course>(url);
  }

  getRecommendedSitesById(courseId: number): Observable<Site[]> {
    let url = 'api/course/' + courseId + '/site';
    return this.http.get<Site[]>(url);
  }

  addSiteByCourseId(courseId: number, site: Site): Observable<Site> {
    let url = 'api/course/' + courseId + '/site';
    return this.http.post<Site>(url, site);
  }
}
