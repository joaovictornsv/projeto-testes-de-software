import { createEnum } from '../utils/utils.js';

export const ServiceStatus = createEnum({
  IN_APPOINTMENT: {
    label: 'Em atendimento',
  },
  DONE: {
    label: 'Atendimento finalizado',
  },
});
