import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

interface HospitlaEntryDetailsProps {
  entry: HospitalEntry;
}

const HosptialEntryDetails = (props: HospitlaEntryDetailsProps) => {
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
  const header = (entry: HospitalEntry) => {
    return (
      <h3>
        {entry.date} <Icon name="hospital" />
      </h3>
    );
  };
  const getDescription = (entry: HospitalEntry) => {
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

export default HosptialEntryDetails;
