export class Patient {
  #documentNumber;
  #name;
  #birthDate;
  #address;
  #phoneNumbers;

  constructor(patientData) {
    this.validatePatientData(patientData);
    this.fillPatientData(patientData);
  }

  validatePatientData(data) {
    const isValid =
      data &&
      data.documentNumber &&
      data.name &&
      data.birthDate &&
      data.address &&
      data.phoneNumbers;

    if (isValid) {
      return;
    }

    throw new Error('Invalid patient data provided.');
  }

  fillPatientData(data) {
    this.#documentNumber = data.documentNumber;
    this.#name = data.name;
    this.#birthDate = data.birthDate;
    this.#address = data.address;
    this.#phoneNumbers = data.phoneNumbers;
  }
}
