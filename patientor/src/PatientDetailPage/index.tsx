import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { addPatientDetail, useStateValue } from "../state";

import Entries from "./Entries";
import PatientOverview from "./PatientOverview";
import AddEntryForm from "./AddEntryForm";

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

  if (!patient) {
    return <p>Not found</p>;
  }

  return (
    <div className="App" style={{ marginTop: "2em" }}>
      <Box>
        <PatientOverview patient={patient} />
        <Typography variant="h6">Entries</Typography>
        <Entries entries={patient.entries} />
        <Typography variant="h6">Add Entry</Typography>
        <AddEntryForm />
      </Box>
    </div>
  );
};

export default PatientDetailPage;
