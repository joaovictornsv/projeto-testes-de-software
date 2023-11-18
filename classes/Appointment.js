import { generateRandomId } from '../utils/utils.js';
import { AppointmentStatus } from '../enums/AppointmentStatus.js';
import { appointmentRepository } from '../repositories/AppointmentRepository.js';

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
    this.status = AppointmentStatus.WAITING_FOR_SERVICE;
    this.createdAt = new Date();
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

  done() {
    this.status = AppointmentStatus.DONE.name;
    appointmentRepository.update(this.id, {
      status: this.status,
    });
  }
}
