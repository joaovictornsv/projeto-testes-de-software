import { describe, expect, test } from 'vitest';
import { Patient } from '../../classes/Patient.js';
import { PatientRepository } from '../../repositories/PatientRepository.js';

const generateFakePatient = (name) => {
  return new Patient({
    documentNumber: '098.987.876-00',
    name: name,
    birthDate: new Date(),
    address: 'Rua Rensilson Bivar',
    phoneNumbers: ['(83) 99983-1234', '2325-2324'],
  });
};

describe('PatientRepository', () => {
  test('save', () => {
    // create
    const patient = generateFakePatient('Luis');
    const patientRepository = new PatientRepository();

    // action
    patientRepository.save(patient);

    // expected
    expect(patientRepository.findById(patient.id)).toBeTruthy();
  });

  test('findByName', () => {
    // create
    const patient1 = generateFakePatient('Luis');
    const patient2 = generateFakePatient('João');
    const patientRepository = new PatientRepository();

    // action
    patientRepository.save(patient1);
    patientRepository.save(patient2);

    // expected
    expect(patientRepository.findByName(patient1.name).name).toEqual(
      patient1.name,
    );

    expect(patientRepository.findByName(patient2.name).name).toEqual(
      patient2.name,
    );
  });

  test('findByName - Patient not found', () => {
    // create
    const patient = generateFakePatient('Victor');
    const patientRepository = new PatientRepository();

    // expected
    expect(patientRepository.findByName(patient.name)).toBeNull();
  });
});
