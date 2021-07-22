import { State } from './state';
import { Patient, Diagnosis } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {},
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: state.diagnoses.concat(action.payload),
      };
    default:
      return state;
  }
};

export const setPatientList = (patientsList: Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientsList,
  } as Action;
};

export const addPatient = (patient: Patient) => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  } as Action;
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]) => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesList,
  } as Action;
};
