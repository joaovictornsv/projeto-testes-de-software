import { describe, test, expect } from 'vitest';
import { Attendant } from '../../models/Attendant.js';

describe('Attendant', () => {
  // Unit
  test('constructor', () => {
    const attendantName = 'Fernando';
    const attendant = new Attendant(attendantName);
    expect(attendant.name).toEqual(attendantName);
  });
});
