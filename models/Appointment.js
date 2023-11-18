import { generateRandomId } from '../utils/utils.js';
import { AppointmentStatus } from '../enums/AppointmentStatus.js';
import { appointmentRepository } from '../repositories/AppointmentRepository.js';
import { PaymentStatus } from '../enums/PaymentTypes.js';

// Consulta
export class Appointment {
  id;
  patientId;
  dentistId;
  type;
  amount;
  procedures;
  status;
  createdAt;

  constructor({ dentistId, patientId, appointmentType }) {
    this.id = generateRandomId();
    this.dentistId = dentistId;
    this.patientId = patientId;
    this.type = appointmentType;
    this.status = AppointmentStatus.WAITING_FOR_SERVICE.name;
    this.createdAt = new Date();
    this.paymentStatus = PaymentStatus.AWAITING_PAYMENT;
    appointmentRepository.save({
      id: this.id,
      dentistId: this.dentistId,
      patientId: this.patientId,
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
    });
  }

  addProcedure(procedure, amount) {
    this.procedures.push({
      procedure,
      amount,
    });
    appointmentRepository.update(this.id, {
      procedures: this.procedures,
    });
  }

  calculateAmount() {
    this.amount = this.procedures.reduce(
      (acc, procedure) => acc + procedure.amount,
      0,
    );
    appointmentRepository.update(this.id, {
      amount: this.amount,
    });
  }

  pay(date) {
    this.checkPayment(date);
    this.paymentStatus = PaymentStatus.PAID_OUT;
    this.status = AppointmentStatus.DONE;
  }

  checkPayment(date) {
    const appointmentDate = new Date(this.createdAt);
    const time =
      date.getTime() -
      appointmentDate.setMonth(appointmentDate.getMonth() + 1).getTime();
    if (time > 0) {
      this.paymentStatus = PaymentStatus.OVERDUE;
      this.amount = this.amount + (this.amount * 10) / 100;
    }
  }

  done() {
    this.status = AppointmentStatus.DONE.name;
    appointmentRepository.update(this.id, {
      status: this.status,
    });
  }
}
