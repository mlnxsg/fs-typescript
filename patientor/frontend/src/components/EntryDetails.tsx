import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  const heartColor = {
    0: "green",
    1: "yellow", 
    2: "orange",
    3: "red",
  }[entry.healthCheckRating];

  return (
    <div style={{ border: "1px solid black", padding: "0.5em", marginBottom: "0.5em", borderRadius: "8px" }}>
      <div>{entry.date} <MedicalServicesIcon fontSize="small" /></div> 
      <em>{entry.description}</em>
      <div><FavoriteIcon style={{ color: heartColor }} /></div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => (
  <div style={{ border: "1px solid black", padding: "0.5em", marginBottom: "0.5em", borderRadius: "0.5em" }}>
    <div>{entry.date} <LocalHospitalIcon fontSize="small" /></div>
    <em>{entry.description}</em>
    <div>{entry.discharge.date} {entry.discharge.criteria}</div>
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const OccupationalHealthcareEntryComponent = ({ entry }: { entry: OccupationalHealthcareEntry }) => (
  <div style={{ border: "1px solid black", padding: "0.5em", marginBottom: "0.5em", borderRadius: "0.5em" }}>
    <div>{entry.date} <WorkIcon fontSize="small" /> {entry.employerName}</div> 
    <div><em>{entry.description}</em></div>
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;