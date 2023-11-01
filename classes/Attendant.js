import { generateRandomId } from '../utils/utils.js';

export class Attendant {
  #id;
  #name;
  #active;

  constructor(name, active) {
    this.#id = generateRandomId();
    this.#name = name;
    this.#active = active;
  }
}
