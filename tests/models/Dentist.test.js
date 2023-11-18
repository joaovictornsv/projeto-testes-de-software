import { describe, test, expect } from 'vitest';
import { Dentist } from '../../models/Dentist.js';

describe('Dentist', () => {
  // Unit
  test('constructor', () => {
    const dentistName = 'Fernando';
    const dentist = new Dentist(dentistName);
    expect(dentist.name).toEqual(dentistName);
  });
});
