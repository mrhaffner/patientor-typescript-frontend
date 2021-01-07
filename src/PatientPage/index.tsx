import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Header, Icon, List, Button } from "semantic-ui-react";
import { HealthEntryFormValues } from "../AddHealthEntryModal/AddHealthEntryForm";
import AddHealthEntryModal from "../AddHealthEntryModal";
import { HospitalEntryFormValues } from "../AddHospitalEntryModal/AddHospitalEntryForm";
import AddHospitalEntryModal from "../AddHospitalEntryModal";
import { OccupationalHealthcareEntryFormValues } from "../AddOccEntryModal/AddOccEntryForm";
import AddOccupationalHealthcareEntryModal from "../AddOccEntryModal";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import EntryDetails from "./EntryDetails";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const currentPatient = Object.values(patient)[0];
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
console.log(patient);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatient(patientFromApi));
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        };
        if (!currentPatient || currentPatient.id !== id) {
            fetchPatient();
            return;
        }
        setLoading(false);
    }, []);
    
    if (loading) return null;
    const icon = () => {
        if (currentPatient.gender === 'male') {
            return "mars";
        } else if (currentPatient.gender === 'female') {
            return "venus";
        }
        return 'genderless';
    };

const submitNewEntry = async (values: HealthEntryFormValues | HospitalEntryFormValues | OccupationalHealthcareEntryFormValues) => {
  try {
    const { data: newEntry } = await axios.post(
      `${apiBaseUrl}/patients/${id}/entries`,
      values
    );
    dispatch(addEntry(newEntry));
    closeModal();
  } catch (e) {
    console.error(e.response.data);
    setError(e.response.data.error);
  }
};

  return (
    <div className="App">
        <Container>
            <Header as="h2">{currentPatient.name}<Icon name={icon()}/></Header>
            <p>ssn: {currentPatient.ssn}</p>
            <p>occupation: {currentPatient.occupation}</p>
            <Header as="h3">entries</Header>
            <List celled>
                {currentPatient.entries.map(entry => (
                    <List.Item key={Math.random()}>
                        <EntryDetails entry={entry}/>
                    </List.Item>
                ))}
            </List>
            <AddHealthEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Health Check Entry</Button>
            <AddHospitalEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Hospital Entry</Button>
            <AddOccupationalHealthcareEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Occupational Healthcare Entry</Button>
        </Container>
    </div>
  );
};

export default PatientPage;