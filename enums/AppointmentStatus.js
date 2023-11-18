import { createEnum } from '../utils/utils.js';

export const AppointmentStatus = createEnum({
  WAITING_FOR_SERVICE: {
    label: 'Aguardando consulta',
    isWaitingForService: true,
  },
  IN_SERVICE: {
    label: 'Em consulta',
  },
  WAITING_PAYMENT: {
    label: 'Aguardando pagamento',
  },
  DONE: {
    label: 'Consulta finalizada',
  },
});
