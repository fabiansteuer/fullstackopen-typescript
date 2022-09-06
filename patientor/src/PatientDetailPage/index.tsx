import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { addPatientDetail, useStateValue } from "../state";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patientDetails }, dispatch] = useStateValue();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientDetail = async (id: string) => {
      try {
        const { data: patientDetail } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientDetail(patientDetail));
      } catch (e) {
        console.error(e);
      }
    };
    if (id && !patientDetails[id]) {
      void fetchPatientDetail(id);
    }
  }, [dispatch]);

  const patient = id ? patientDetails[id] : undefined;

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
