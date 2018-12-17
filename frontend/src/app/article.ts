import { Course } from './course';
export class Article {
  id: number;
  course: Course;
  content: string;
  url: string;
  updated: Date;
  star: boolean;
  ignore: boolean;
}
