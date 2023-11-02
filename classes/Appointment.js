// Consulta
import { generateRandomId } from '../utils/utils.js';
import { AppointmentStatus } from '../enums/AppointmentStatus.js';

export class Appointment {
  #id;
  #patientId;
  #dentistId;
  #type;
  #amount;
  #procedures;
  #status;
  #createdAt;

  constructor(appointmentData) {
    this.#id = generateRandomId();
    this.#dentistId = appointmentData.dentistId;
    this.#patientId = appointmentData.patientId;
    this.#type = appointmentData.type;
    this.#status = AppointmentStatus.WAITING_FOR_SERVICE;
    this.#createdAt = new Date();
  }

  addProcedure(procedure, amount) {
    this.#procedures.push({
      procedure,
      amount,
    });
  }

  calculateAmount() {
    this.#amount = this.#procedures.reduce(
      (acc, procedure) => acc + procedure.amount,
      0,
    );
  }

  get status() {
    return this.#status;
  }

  done() {
    this.#status = AppointmentStatus.DONE.name;
  }
}
