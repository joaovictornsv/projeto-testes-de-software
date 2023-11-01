import { createEnum } from '../utils/utils';

export const PaymentTypes = createEnum({
  PIX: {
    label: 'Pix',
    isPix: true,
  },
  CREDIT_CARD: {
    label: 'Cartão de crédito',
    isCreditCard: true,
  },
  DEBIT_CARD: {
    label: 'Cartão de débito',
    isDebitCard: true,
  },
  MONEY: {
    label: 'Dinheiro',
    isMoney: true,
  },
});
