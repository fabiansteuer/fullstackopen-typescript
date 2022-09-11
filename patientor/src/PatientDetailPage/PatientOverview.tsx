import { Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Gender, Patient } from "../types";
import { assertNever } from "../utils";

const GenderIcon: React.FC<{ patient: Patient }> = ({ patient }) => {
  switch (patient.gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Other:
      return <TransgenderIcon />;
    default:
      assertNever(patient.gender);
      return null;
  }
};

const PatientOverview: React.FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <>
      <Typography variant="h5">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {patient.name} <GenderIcon patient={patient} />
        </div>
      </Typography>
      <p>Occupation: {patient.occupation}</p>
      {patient.ssn && <p>SSN: {patient.ssn}</p>}
    </>
  );
};

export default PatientOverview;
