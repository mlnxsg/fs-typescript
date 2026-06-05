import { useState } from "react";
import axios from "axios";
import { Button, Typography, TextField, Box, Select, MenuItem, FormControl, InputLabel, Chip } from "@mui/material";
import type { Entry, HealthCheckRating, EntryType, EntryWithoutId, Diagnosis } from '../types';
import patientService from '../services/patients';
import Notification from './Notification';

interface Props {
  patientId: string;
  diagnoses: Diagnosis[];
  onSubmit: (entry: Entry) => void;
  onCancel: () => void;
}

const EntryForm = ({ patientId, diagnoses, onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const entryCreation = (event: React.SyntheticEvent)=> {
    event.preventDefault();

    const getEntryObject = (): EntryWithoutId => {
      const base = {
        date,
        description,
        specialist,
        diagnosisCodes: codes,
      };

      switch (entryType) {
        case "HealthCheck":
          return { ...base, type: "HealthCheck" as const, healthCheckRating: Number(rating) as HealthCheckRating };
        case "OccupationalHealthcare":
          return {
            ...base,
            type: "OccupationalHealthcare" as const,
            employerName,
            sickLeave: sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
          };
        case "Hospital":
          return {
            ...base,
            type: "Hospital" as const,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
          };
      }
    };

    patientService.createEntry({
      patientId,
      object: getEntryObject()
    }).then(returnedEntry => {
      onSubmit(returnedEntry);
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        const issues = error.response?.data?.error;
        if (Array.isArray(issues)) {
          setErrorMessage(issues.map((i: {path: string[], message: string}) => 
            `${i.path.join('.')}: ${i.message}`
          ).join(', '));
        } else {
          setErrorMessage('Unknown error');
        }
      }
      setTimeout(() => setErrorMessage(''), 5000);
    });

    setDate('');
    setDescription('');
    setSpecialist('');
    setRating('');
    setCodes([]);
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  return (
    <Box sx={{ border: "1px dashed", padding: "1em", marginTop: "1em", borderRadius: "0.5em" }}>
        <Typography variant="h5">New Entry</Typography>
        
        <Notification message={errorMessage} />

        <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Entry type</InputLabel>
            <Select value={entryType} label="Entry type" onChange={e => setEntryType(e.target.value)}>
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Date *" type='date' fullWidth margin="dense" value={date} onChange={e => setDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Description *" fullWidth margin="dense" value={description} onChange={e => setDescription(e.target.value)} />
          <TextField label="Specialist *" fullWidth margin="dense" value={specialist} onChange={e => setSpecialist(e.target.value)} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Diagnosis codes</InputLabel>
            <Select
              multiple
              label="Diagnosis codes"
              value={codes}
              onChange={e => setCodes(e.target.value as string[])}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map(d => (
                <MenuItem key={d.code} value={d.code}>
                  {d.code} — {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            {entryType === "HealthCheck" && (
              <FormControl fullWidth margin="dense">
                <InputLabel>Health Check Rating (0-3)</InputLabel>
                <Select label="Health Check Rating (0-3) *" fullWidth margin="dense" value={rating} onChange={e => setRating(e.target.value)}>
                  <MenuItem value={0}>0 — Healthy</MenuItem>
                  <MenuItem value={1}>1 — Low Risk</MenuItem>
                  <MenuItem value={2}>2 — High Risk</MenuItem>
                  <MenuItem value={3}>3 — Critical Risk</MenuItem>
                </Select>
              </FormControl>
            )}
            {entryType === "OccupationalHealthcare" && (
              <>
                <TextField label="Employer Name *" fullWidth margin="dense" value={employerName} onChange={e => setEmployerName(e.target.value)} />
                <TextField label="Sick Leave Start" fullWidth margin="dense" value={sickLeaveStart} onChange={e => setSickLeaveStart(e.target.value)} />
                <TextField label="Sick Leave End" fullWidth margin="dense" value={sickLeaveEnd} onChange={e => setSickLeaveEnd(e.target.value)} />
              </>
            )}
            {entryType === "Hospital" && (
              <>
                <TextField label="Discharge Date *" fullWidth margin="dense" value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} />
                <TextField label="Discharge Criteria *" fullWidth margin="dense" value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} />
              </>
            )}
          </div>
        </div>
        
        <div>
          <Button variant="contained" onClick={entryCreation} sx={{ marginRight: "0.5em" }}>ADD</Button>
          <Button variant="outlined" onClick={onCancel}>CANCEL</Button>
        </div>
      </Box>
  );
};

export default EntryForm;