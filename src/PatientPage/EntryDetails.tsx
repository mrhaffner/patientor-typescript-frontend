import React from 'react';
import { Entry } from "../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
      
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;