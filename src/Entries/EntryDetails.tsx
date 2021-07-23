import React from 'react';
import { assertNever, Entry } from '../types';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HosptialEntryDetails from './HosptialEntryDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = (props: EntryDetailsProps) => {
  switch (props.entry.type) {
    case 'Hospital':
      return <HosptialEntryDetails entry={props.entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={props.entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={props.entry} />;
    default:
      return assertNever(props.entry);
  }
};

export default EntryDetails;
