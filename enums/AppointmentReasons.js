import { createEnum } from '../utils/utils.js';

export const AppointmentReasons = createEnum({
  ROUTINE: {
    label: 'Rotina',
  },
  TOOTHACHE: {
    label: 'Dor de dente',
  },
});
