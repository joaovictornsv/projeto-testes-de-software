import { generateRandomId } from '../utils/utils.js';

export class Attendant {
  id;
  name;
  active;

  constructor() {
    this.id = generateRandomId();
  }

  set(attendantData) {
    this.name = attendantData.name;
    this.active = attendantData.active;
  }
}
