import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography, Button } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Gender, Diagnosis } from "../types";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getById(id);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const data = await patientService.getDiagnoses();
      setDiagnoses(data);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient || !id) return <div>Loading...</div>;

  const genderIcon = {
    [Gender.Male]: <MaleIcon fontSize="inherit" sx={{ verticalAlign: "middle" }} />,
    [Gender.Female]: <FemaleIcon fontSize="inherit" sx={{ verticalAlign: "middle" }} />,
    [Gender.Other]: <TransgenderIcon fontSize="inherit" sx={{ verticalAlign: "middle" }} />
  };

  return (
    <div>
      <Typography variant="h4">{patient.name} {genderIcon[patient.gender]}</Typography>
      <div style={{ marginTop: "1em" }}>
        <div>ssn: {patient.ssn}</div> 
        <div>occupation: {patient.occupation}</div>
        <div>date of birth: {patient.dateOfBirth}</div>
      </div>
      
      <Typography variant="h5" style={{ marginTop: "1em" }}>entries</Typography>
      <div style={{marginTop: "1em", marginBottom: "1em"}}>
        {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>

      {showForm
        ? <EntryForm 
            patientId={id}
            diagnoses={diagnoses}
            onSubmit={(entry) => setPatient({ ...patient, entries: patient.entries.concat(entry)})} 
            onCancel={() => setShowForm(false)} 
          />
        : <Button variant="contained" onClick={() => setShowForm(true)}>Add New Entry</Button>
      }
    </div>
  );
};

export default PatientPage;