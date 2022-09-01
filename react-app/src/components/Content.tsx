import { CoursePart } from "../types";
import { FunctionComponent } from "react";

interface Props {
  courseParts: Array<CoursePart>;
}

const Content: FunctionComponent<Props> = ({ courseParts }: Props) => {
  return (
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
