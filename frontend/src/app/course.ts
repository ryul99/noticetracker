import { LectureTime } from './lecturetime';
export class Course {
  id: number;
  name: string;
  lectureCode: string;
  profName: string;
  classNumber: number;
  time: LectureTime[];
}
