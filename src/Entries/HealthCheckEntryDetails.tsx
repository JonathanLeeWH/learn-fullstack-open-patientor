import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating } from '../types';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = (props: HealthCheckEntryProps) => {
  const getHealthCheckRatingIcon = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case 0:
        return <Icon name="heart" color="green" />;
      case 1:
        return <Icon name="heart" color="yellow" />;
      case 2:
        return <Icon name="heart" color="orange" />;
      case 3:
        return <Icon name="heart" color="red" />;
      default:
        throw new Error('Invalid Health check rating.');
    }
  };

  const [{ diagnoses }] = useStateValue();
  const getDiagnosisName = (diagnosisCode: string): string | null => {
    const diagnosisArray = diagnoses.filter(
      (diagnosis) => diagnosis.code === diagnosisCode,
    );
    if (diagnosisArray.length !== 0) {
      return diagnosisArray[0].name;
    } else {
      return null;
    }
  };
  const header = (entry: HealthCheckEntry) => {
    return (
      <h3>
        {entry.date} <Icon name="doctor" />
      </h3>
    );
  };
  const getDescription = (entry: HealthCheckEntry) => {
    return (
      <>
        {getHealthCheckRatingIcon(entry.healthCheckRating)} <br />
        {entry.diagnosisCodes !== undefined &&
        entry.diagnosisCodes.length !== 0 ? (
          <>
            <ul>
              {entry.diagnosisCodes.map((code, index) => {
                return (
                  <li key={index}>
                    {code} {getDiagnosisName(code)}
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
      </>
    );
  };
  return (
    <Card
      fluid
      header={header(props.entry)}
      meta={props.entry.description}
      description={getDescription(props.entry)}
    />
  );
};

export default HealthCheckEntryDetails;
