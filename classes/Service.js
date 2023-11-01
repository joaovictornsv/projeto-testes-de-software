// Atendimento
import { generateRandomId } from '../utils/utils.js';

export class Service {
  #id;
  #patientId;
  #dentistId;
  #attendantId;
  #appointmentId;
  #details;
  #numericCode;
  #createdAt;

  constructor(appointmentData) {
    this.#id = generateRandomId();
    this.#dentistId = appointmentData.dentistId;
    this.#patientId = appointmentData.patientId;
    this.#attendantId = appointmentData.attendantId;
    this.#appointmentId = appointmentData.appointmentId;
    this.#numericCode = appointmentData.numericCode;
    this.#createdAt = new Date();
  }

  addDetails(appointmentDetails) {
    this.#details = appointmentDetails.details;
  }
}
