import { createEnum } from '../utils/utils.js';

export const AppointmentTypes = createEnum({
  ROUTINE: {
    label: 'Rotina',
  },
  TOOTHACHE: {
    label: 'Dor de dente',
  },
});
