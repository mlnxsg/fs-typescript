import type { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((p: CoursePart) => 
        <Part key={p.name} part={p} />
      )}
    </div>
  )
}

export default Content;