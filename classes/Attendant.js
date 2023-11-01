export class Attendant {
  #name;

  constructor(name) {
    if (!name) {
      throw new Error('Provided a name for Attendant.');
    }
    this.#name = name;
  }
}
