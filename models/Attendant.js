import { generateRandomId } from '../utils/utils.js';

export class Attendant {
  id;
  name;

  constructor(attendantName) {
    this.id = generateRandomId();
    this.name = attendantName;
  }
}
