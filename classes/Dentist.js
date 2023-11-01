import { generateRandomId } from '../utils/utils';

export class Dentist {
  #name;
  #id;
  #active;

  constructor(dentistName, active) {
    this.#id = generateRandomId();
    this.#name = dentistName;
    this.#active = active;
  }
}
