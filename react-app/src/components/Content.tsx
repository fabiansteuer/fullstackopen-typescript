import { CoursePart } from "../types";
import { FunctionComponent } from "react";

interface PartProps {
  coursePart: CoursePart;
}

const Part: FunctionComponent<PartProps> = ({ coursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <h3>Course</h3>
          <p>Name: {coursePart.name}</p>
          <p>Description: {coursePart.description}</p>
          <p>Exercise count: {coursePart.exerciseCount}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>Course</h3>
          <p>Name: {coursePart.name}</p>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Group project count: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>Course</h3>
          <p>Name: {coursePart.name}</p>
          <p>Description: {coursePart.description}</p>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Exercise submission link: {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>Course</h3>
          <p>Name: {coursePart.name}</p>
          <p>Description: {coursePart.description}</p>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Requirements: {coursePart.requirements.join(", ")}</p>
        </div>
      );
    default:
      return null;
  }
};

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: FunctionComponent<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part: CoursePart) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
};

export default Content;
