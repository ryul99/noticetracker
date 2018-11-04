import { LectureTime } from './lecturetime';
import { Site } from './site';
export class Course {
  id: number;
  name: string;
  lectureCode: string;
  profName: string;
  classNumber: number;
  time: LectureTime[];
  sites: Site[];
}
