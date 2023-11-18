import { generateRandomId } from '../utils/utils.js';
import { patientRepository } from '../repositories/PatientRepository.js';

export class Patient {
  id;
  documentNumber;
  name;
  birthDate;
  address;
  phoneNumbers;

  constructor({ documentNumber, name, birthDate, address, phoneNumbers }) {
    this.id = generateRandomId();
    this.documentNumber = documentNumber;
    this.name = name;
    this.birthDate = birthDate;
    this.address = address;
    this.phoneNumbers = phoneNumbers;
    patientRepository.save({
      id: this.id,
      documentNumber: this.documentNumber,
      name: this.name,
      birthDate: this.birthDate,
      address: this.address,
      phoneNumbers: this.phoneNumbers,
    });
  }
}
