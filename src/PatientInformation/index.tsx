import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import EntryDetails from '../Entries/EntryDetails';
import { addPatient, useStateValue } from '../state';
import { Entry, Gender, Patient } from '../types';

const PatientInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [{ patients }, dispatch] = useStateValue();
  const getPatient = async (patientId: string) => {
    if (Object.keys(patients).includes(id)) {
      return patients[id];
    } else {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`,
        );
        dispatch(addPatient(patientFromApi));
        return patientFromApi;
      } catch (e) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    void getPatient(id).then((response) => setPatient(response));
  });
  const getPatientGenderIcon = (patientGender: Gender) => {
    switch (patientGender) {
      case Gender.Male:
        return <Icon name="mars" />;
      case Gender.Female:
        return <Icon name="venus" />;
      case Gender.Other:
        return <Icon name="genderless" />;
      default:
        return null;
    }
  };
  if (patient) {
    return (
      <>
        <h2>
          {patient.name} {getPatientGenderIcon(patient.gender)}
        </h2>
        {patient.ssn ? (
          <>
            {`ssn: ${patient.ssn}`} <br />
          </>
        ) : null}
        <p>{`occupation: ${patient.occupation}`}</p>
        {patient.entries.length !== 0 ? (
          <div>
            <h3>entries</h3>
            {patient.entries.map((entry, index) => {
              return (
                <div key={index}>
                  <EntryDetails entry={entry as Entry} />
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <h2>Patient not found</h2>
      </>
    );
  }
};

export default PatientInformation;
