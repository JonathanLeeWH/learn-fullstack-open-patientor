import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

interface OccupationalHealthcareDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails = (
  props: OccupationalHealthcareDetailsProps,
) => {
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
  const header = (entry: OccupationalHealthcareEntry) => {
    return (
      <h3>
        {entry.date} <Icon name="stethoscope" /> {entry.employerName}
      </h3>
    );
  };
  const getDescription = (entry: OccupationalHealthcareEntry) => {
    return (
      <>
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

export default OccupationalHealthcareDetails;
