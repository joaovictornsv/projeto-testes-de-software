import { generateRandomId } from '../utils/utils.js';
import { AppointmentStatus } from '../enums/AppointmentStatus.js';
import { PaymentStatus } from '../enums/PaymentTypes.js';
import { Procedure } from './Procedure.js';

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
  appointmentRepository;

  constructor(
    { dentistId, patientId, appointmentType },
    { appointmentRepository },
  ) {
    this.id = generateRandomId();
    this.dentistId = dentistId;
    this.patientId = patientId;
    this.type = appointmentType;
    this.status = AppointmentStatus.WAITING_FOR_SERVICE.name;
    this.createdAt = new Date();
    this.paymentStatus = PaymentStatus.WAITING_PAYMENT.name;
    this.procedures = [];

    this.appointmentRepository = appointmentRepository;
    this.appointmentRepository.save({
      id: this.id,
      dentistId: this.dentistId,
      patientId: this.patientId,
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
    });
  }

  addProcedure({ details, amount }) {
    this.procedures.push(
      new Procedure({
        details,
        amount,
      }),
    );
    this.appointmentRepository.update(this.id, {
      procedures: this.procedures,
    });
  }

  calculateAmount() {
    this.amount = this.procedures.reduce(
      (acc, procedure) => acc + procedure.amount,
      0,
    );
    this.appointmentRepository.update(this.id, {
      amount: this.amount,
    });
  }

  pay(date) {
    this.checkPayment(date);
    this.paymentStatus = PaymentStatus.PAID_OUT.name;
    this.status = AppointmentStatus.DONE.name;
  }

  checkPayment(date) {
    const appointmentDate = new Date(this.createdAt);
    const time =
      date.getTime -
      appointmentDate.setMonth(appointmentDate.getMonth() + 1).getTime;
    if (time > 0) {
      this.paymentStatus = PaymentStatus.OVERDUE.name;
      this.amount = this.amount + (this.amount * 10) / 100;
    }
  }

  done() {
    this.status = AppointmentStatus.DONE.name;
    this.appointmentRepository.update(this.id, {
      status: this.status,
    });
  }
}
