import { generateRandomId } from '../utils/utils';

export class Dentist {
  name;
  id;

  constructor(dentistName) {
    this.id = generateRandomId();
    this.name = dentistName;
  }
}
