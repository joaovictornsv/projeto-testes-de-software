import { createEnum } from '../utils/utils.js';

export const ServiceStatus = createEnum({
  IN_SERVICE: {
    label: 'Em atendimento',
  },
  DONE: {
    label: 'Atendimento finalizado',
  },
});
