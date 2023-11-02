// Atendimento
import { generateRandomId } from '../utils/utils.js';
import { ServiceStatus } from '../enums/ServiceStatus.js';

export class Service {
  #id;
  #patientId;
  #dentistId;
  #attendantId;
  #appointmentId;
  #details;
  #numericCode;
  #status;
  #createdAt;

  constructor(appointmentData) {
    this.#id = generateRandomId();
    this.#dentistId = appointmentData.dentistId;
    this.#patientId = appointmentData.patientId;
    this.#attendantId = appointmentData.attendantId;
    this.#appointmentId = appointmentData.appointmentId;
    this.#status = ServiceStatus.OPEN.name;
    this.#createdAt = new Date();
  }

  get numericCode() {
    return this.#numericCode;
  }

  set numericCode(numericCode) {
    this.#numericCode = numericCode;
  }

  addDetails(appointmentDetails) {
    this.#details = appointmentDetails.details;
  }

  done() {
    this.#status = ServiceStatus.DONE.name;
  }
}
