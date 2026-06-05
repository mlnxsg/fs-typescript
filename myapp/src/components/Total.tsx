import type { CoursePart } from "../types";

const Total = ({parts}: {parts: CoursePart[]}) => {
  return <p>Number of exercises { parts.reduce((sum, part) => sum + part.exerciseCount, 0) }</p>
};

export default Total;