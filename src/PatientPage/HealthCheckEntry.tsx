import React from 'react';
import { Header, Icon } from "semantic-ui-react";
import { HealthCheckEntry as HealthCheckEntryType } from "../types";

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
    const getIconColor = (rating: number) => {
        switch (rating) {
            case 0:
                return "green";
            case 1:
                return "olive";
            case 2: 
                return "yellow";
            case 3:
                return "red";
            default:
                return undefined;
        }
    };

    return (
        <div>
            <Header as="h4">{entry.date} <Icon name="user md" /></Header>
            <p>{entry.description}</p>
            <Icon name="heart" color={getIconColor(entry.healthCheckRating)} />
        </div>
    );
};

export default HealthCheckEntry;