import { Injectable } from '@angular/core';
import { Site } from './site';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() {}

  searchByCode(courseCode: string) {}

  searchByName(name: string) {}

  getCourseObjectById(courseId: number) {}

  getRecommendedSitesById(courseId: number) {}

  addRecommendSite(courseId: number, site: Site) {}
}
