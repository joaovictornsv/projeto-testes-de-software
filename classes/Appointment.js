// Consulta
import { generateRandomId } from '../utils/utils.js';

export const generateNewProcedure = (procedure, amount) => ({
  procedure,
  amount,
});

export class Appointment {
  #id;
  #patientId;
  #dentistId;
  #type;
  #amount;
  #details;
  #procedures;

  constructor(appointmentData) {
    this.#id = generateRandomId();
    this.#dentistId = appointmentData.dentistId;
    this.#patientId = appointmentData.patientId;
    this.#type = appointmentData.type;
  }

  addDetails(appointmentDetails) {
    this.#details = appointmentDetails.details;
    this.#procedures = appointmentDetails.procedures;
  }

  calculateAmount() {
    this.#amount = this.#procedures.reduce(
      (acc, procedure) => acc + procedure.amount,
      0,
    );
  }
}
