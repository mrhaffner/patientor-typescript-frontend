import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const currentPatient = Object.values(patient)[0];

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

  return (
    <div className="App">
        <Container>
            <Header as="h2">{currentPatient.name}<Icon name={icon()}/></Header>
            <p>ssn: {currentPatient.ssn}</p>
            <p>occupation:{currentPatient.occupation}</p>
        </Container>
    </div>
  );
};

export default PatientPage;