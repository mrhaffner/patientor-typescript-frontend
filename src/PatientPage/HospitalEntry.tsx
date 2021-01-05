import React from 'react';
import { Header, Icon } from "semantic-ui-react";
import { HospitalEntry as HospitalEntryType } from "../types";
import { useStateValue } from "../state";

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();

    return (
        <div>
            <Header as="h4">{entry.date}<Icon name="hospital"/></Header>
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

export default HospitalEntry;