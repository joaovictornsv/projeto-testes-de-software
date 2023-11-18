import { describe, test, expect } from 'vitest';
import { Patient } from '../../models/Patient.js';

describe('Patient', () => {
  // Unit
  test('constructor', () => {
    const name = 'João';
    const address = 'Rua José Maria, 130';
    const phoneNumbers = ['99999999999'];
    const documentNumber = '000.000.000-00';
    const birthDate = new Date();

    const patient = new Patient({
      name,
      address,
      documentNumber,
      phoneNumbers,
      birthDate,
    });
    expect(patient.name).toEqual(name);
    expect(patient.address).toEqual(address);
    expect(patient.phoneNumbers[0]).toEqual(phoneNumbers[0]);
    expect(patient.documentNumber).toEqual(documentNumber);
    expect(patient.birthDate).toEqual(birthDate);
  });
});
