import { generateRandomId } from '../utils/utils.js';

export class Patient {
  id;
  documentNumber;
  name;
  birthDate;
  address;
  phoneNumbers;

  constructor() {
    this.id = generateRandomId();
  }

  set({ documentNumber, name, birthDate, address, phoneNumbers }) {
    this.documentNumber = documentNumber;
    this.name = name;
    this.birthDate = birthDate;
    this.address = address;
    this.phoneNumbers = phoneNumbers;
  }
}
