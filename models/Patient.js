import { generateRandomId } from '../utils/utils.js';

export class Patient {
  id;
  documentNumber;
  name;
  birthDate;
  address;
  phoneNumbers;
  patientRepository;

  constructor(
    { documentNumber, name, birthDate, address, phoneNumbers },
    { patientRepository },
  ) {
    this.id = generateRandomId();
    this.documentNumber = documentNumber;
    this.name = name;
    this.birthDate = birthDate;
    this.address = address;
    this.phoneNumbers = phoneNumbers;
    this.patientRepository = patientRepository;
    this.patientRepository.save({
      id: this.id,
      documentNumber: this.documentNumber,
      name: this.name,
      birthDate: this.birthDate,
      address: this.address,
      phoneNumbers: this.phoneNumbers,
    });
  }
}
