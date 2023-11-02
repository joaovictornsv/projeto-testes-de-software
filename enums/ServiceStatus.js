import { createEnum } from '../utils/utils.js';

export const ServiceStatus = createEnum({
  OPEN: {
    label: 'Em atendimento',
  },
  DONE: {
    label: 'Atendimento finalizado',
  },
});
