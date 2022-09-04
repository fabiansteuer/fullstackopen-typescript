// import React from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

// import { apiBaseUrl } from "../constants";
// import { Patient } from "../types";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }] = useStateValue();

  // React.useEffect(() => {
  //   const fetchPatient = async () => {
  //     try {
  //       const { data: patientFromApi } = await axios.get<Patient>(
  //         `${apiBaseUrl}/patients/${id}`
  //       );
  //       // dispatch({ type: "SET_PATIENT", payload: patientFromApi });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   void fetchPatient();
  // }, [dispatch]);

  // console.log(Object.values(patients));

  // const patient = Object.values(patients)[0];

  const patient = Object.values(patients).find((patient) => patient.id === id);

  const icon = (patient: Patient) => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
    }
  };

  if (!patient) {
    return <p>Not found</p>;
  }

  return (
    <div className="App" style={{ marginTop: "2em" }}>
      <Box>
        <Typography variant="h6">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {patient.name} {icon(patient)}
          </div>
        </Typography>
        <p>Occupation: {patient.occupation}</p>
        {patient.ssn && <p>SSN: {patient.ssn}</p>}
      </Box>
    </div>
  );
};

export default PatientDetailPage;
