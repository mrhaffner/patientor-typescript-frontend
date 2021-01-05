import React from 'react';
import { Header, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../types";
import { useStateValue } from "../state";

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();

    return (
        <div>
            <Header as="h4">{entry.date} <Icon name="stethoscope"/> {entry.employerName}</Header>
            <p>{entry.description}</p>
            {entry.diagnosisCodes &&
                <ul>
                    {entry.diagnosisCodes.map(code => 
                        <li key={code}>{code} {diagnoses.find(x => x.code === code)?.name ?? "Unknown"}</li>
                    )}
                </ul>
            }
        </div>
    );
};

export default OccupationalHealthcareEntry;