import { Course } from './course';
export class Article {
  id: number;
  course: Course;
  content: string;
  url: string;
  star: boolean;
  ignore: boolean;

  toggleStar() {
    this.star = !this.star;
  }

  toggleIgnore() {
    this.ignore = !this.ignore;
  }
}
