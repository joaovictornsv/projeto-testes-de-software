import { generateRandomId } from '../utils/utils.js';

export class Patient {
  #id;
  #documentNumber;
  #name;
  #birthDate;
  #address;
  #phoneNumbers;

  constructor(patientData) {
    this.#id = generateRandomId();
    this.#documentNumber = patientData.documentNumber;
    this.#name = patientData.name;
    this.#birthDate = patientData.birthDate;
    this.#address = patientData.address;
    this.#phoneNumbers = patientData.phoneNumbers;
  }
}
