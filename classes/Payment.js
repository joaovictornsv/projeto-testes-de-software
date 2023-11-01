import { PaymentTypes } from '../enums/PaymentTypes';

export class Payment {
  #mode;

  constructor(paymentMode) {
    this.#mode = this.validateMode(paymentMode);
  }

  pay() {
    return 'Pago';
  }

  validateMode(mode) {
    const paymentType = PaymentTypes[mode];
    if (!paymentType) {
      throw Error('Modo de pagamento inválido!');
    }
    return mode;
  }
}
