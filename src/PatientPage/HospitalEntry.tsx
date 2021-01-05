import React from 'react';
import { List, Icon } from "semantic-ui-react";
import { HospitalEntry as HospitalEntryType } from "../types";
import { useStateValue } from "../state";

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();

    return (
        <List.Content>
            <List.Header as="h4">{entry.date}<Icon name="hospital"/></List.Header>
            {entry.description}<br/>
            {entry.diagnosisCodes &&
                <List as='ol'>
                    <List.Header>Diagnoses:</List.Header>
                    <List.Item as='ol'>
                    {entry.diagnosisCodes.map(code =>
                        <List.Item key={code} as='li' value=''>
                            {code}: {diagnoses.find(x => x.code === code)?.name ?? "Unknown"}
                        </List.Item>
                    )}
                    </List.Item>
                </List>
            }
        </List.Content>
    );
};

export default HospitalEntry;