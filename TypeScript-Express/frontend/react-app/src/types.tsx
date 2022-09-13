interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal"
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission"
  exerciseSubmissionLink: string
}
interface CourseDescriptionPart extends CoursePartBase {
  description: string
}
interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special"
  requirements: string[]
}

export interface ContentProps {
  courseParts: CoursePart[]
}

type CoursePart =
  | CourseSpecialPart
  | CourseSubmissionPart
  | CourseProjectPart
  | CourseNormalPart

export interface PartProps {
  part: CoursePart
}
export default CoursePart
