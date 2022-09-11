import { Typography } from "@material-ui/core";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";

import { useStateValue } from "../state";
import {
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Entry,
} from "../types";

import { assertNever } from "../utils";

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
  const [{ diagnoses }] = useStateValue();

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

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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

export default Entries;
