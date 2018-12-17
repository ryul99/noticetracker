import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './course';
import { Site } from './site';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  searchByCode(courseCode: string): Observable<Course[]> {
    let url = 'api/search/code/' + courseCode;
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
    let url = 'api/course/' + courseId + '/site/';
    return this.http.get<Site[]>(url);
  }

  deleteSiteById(courseId: number, siteId: number): Observable<boolean> {
    let url = 'api/course/' + courseId + '/site/' + siteId;
    return this.http.delete<boolean>(url);
  }

  addSiteByCourseId(courseId: number, site: Partial<Site>): Observable<Site> {
    let url = 'api/course/' + courseId + '/site/';
    return this.http.post<Site>(url, site);
  }
}
