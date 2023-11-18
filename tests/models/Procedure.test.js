import { describe, test, expect } from 'vitest';
import { Procedure } from '../../models/Procedure.js';

describe('Procedure', () => {
  // Unit
  test('constructor', () => {
    const details = 'Procedure 1';
    const amount = 100.5;
    const procedure = new Procedure({ details, amount });
    expect(procedure.details).toEqual(details);
    expect(procedure.amount).toEqual(amount);
  });
});
