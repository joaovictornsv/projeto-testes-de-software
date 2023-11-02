import { generateRandomId } from '../utils/utils';

export class Dentist {
  name;
  id;
  active;

  constructor() {
    this.id = generateRandomId();
  }

  set(dentistData) {
    this.name = dentistData.dentistName;
    this.active = dentistData.active;
  }
}
