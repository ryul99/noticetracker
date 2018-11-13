import { Injectable } from '@angular/core';
import { Site } from './site';
import { Observable, of } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() {}

  searchByCode(courseCode: string): Observable<Course[]> {}

  searchByName(name: string): Observable<Course[]> {}

  getCourseObjectById(courseId: number): Observable<Course> {}

  getRecommendedSitesById(courseId: number): Observable<Site[]> {}

  addSiteByCourseId(courseId: number, site: Site): Observable<Site> {}
}
