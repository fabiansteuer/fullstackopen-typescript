import { CoursePart } from "../types";
import { FunctionComponent } from "react";

interface Props {
  courseParts: Array<CoursePart>;
}

const Total: FunctionComponent<Props> = ({ courseParts }: Props) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
  Total;
};

export default Total;