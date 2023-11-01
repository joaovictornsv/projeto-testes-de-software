import { generateRandomId } from '../utils/utils.js';

export class Attendant {
  #id;
  #name;

  constructor(name) {
    this.#id = generateRandomId();
    this.#name = name;
  }
}
