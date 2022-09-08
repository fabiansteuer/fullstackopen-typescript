import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";

import { apiBaseUrl } from "../constants";
import {
  Gender,
  Patient,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Entry,
} from "../types";
import { addPatientDetail, useStateValue } from "../state";
import { assertNever } from "../utils";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();

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

  const EntryIcon: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <MonitorHeartIcon />;
      case "OccupationalHealthcare":
        return <RuleFolderIcon />;
      case "Hospital":
        return <LocalHospitalIcon />;
      default:
        assertNever(entry);
        return null;
    }
  };

  const BaseEntry: React.FC<{ entry: Entry; children?: React.ReactNode }> = ({
    entry,
    children,
  }) => {
    return (
      <div
        style={{
          border: "2px solid gray",
          borderRadius: "4px",
          padding: "8px",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <EntryIcon entry={entry} /> {entry.date}
        </Typography>
        <p>{entry.description}</p>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code}: {diagnoses.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
        )}
        {children}
        <p>Specialist: {entry.specialist}</p>
      </div>
    );
  };

  const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({
    entry,
  }) => {
    return (
      <>
        <BaseEntry entry={entry}>
          Health rating: {entry.healthCheckRating}
        </BaseEntry>
      </>
    );
  };

  const OccupationalHealthcareEntryDetail: React.FC<{
    entry: OccupationalHealthcareEntry;
  }> = ({ entry }) => {
    return (
      <>
        <BaseEntry entry={entry}>
          Employer: {entry.employerName}
          {entry.sickLeave && (
            <p>
              Sick leave: {entry.sickLeave?.startDate} to{" "}
              {entry.sickLeave?.endDate}
            </p>
          )}
        </BaseEntry>
      </>
    );
  };

  const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({
    entry,
  }) => {
    return (
      <>
        <BaseEntry entry={entry}>
          <p>
            Discharge: {entry.discharge.date} — {entry.discharge.criteria}
          </p>
        </BaseEntry>
      </>
    );
  };

  const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntryDetail entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetail entry={entry} />;
      case "Hospital":
        return <HospitalEntryDetail entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const Entries = ({ entries }: { entries: Entry[] }) => {
    return (
      <>
        {entries.map((entry) => (
          <EntryDetail key={entry.id} entry={entry} />
        ))}
      </>
    );
  };

  if (!patient) {
    return <p>Not found</p>;
  }

  return (
    <div className="App" style={{ marginTop: "2em" }}>
      <Box>
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
        <Typography variant="h6">Entries</Typography>
        <Entries entries={patient.entries} />
      </Box>
    </div>
  );
};

export default PatientDetailPage;
