import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part:CoursePart}) => {
  switch (part.kind) {
    case "basic":
      return (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 'bold' }}>{part.name} {part.exerciseCount}</div>
          <div><em>{part.description}</em></div>
        </div>
      );
    case "group":
      return (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 'bold' }}>{part.name} {part.exerciseCount}</div>
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      )
    case "background":
      return (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 'bold' }}>{part.name} {part.exerciseCount}</div>
          <div><em>{part.description}</em></div>
          <div>{part.backgroundMaterial}</div>
        </div>
      )
    case "special":
      return (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 'bold' }}>{part.name} {part.exerciseCount}</div>
          <div><em>{part.description}</em></div>
          <div>{part.requirements}</div>
        </div>
      )
    default:
      return assertNever(part);
  }
}

export default Part;