export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDes extends CoursePartBase{
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDes {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWithDes {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequire extends CoursePartBaseWithDes {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequire;
