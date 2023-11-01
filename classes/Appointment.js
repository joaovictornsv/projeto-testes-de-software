// Consulta
import { generateRandomId } from '../utils/utils.js';

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
}
