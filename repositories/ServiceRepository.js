import { BaseRepository } from './BaseRepository.js';

export class ServiceRepository extends BaseRepository {
  save(newData) {
    newData.numericCode = this.#generateNextNumericCode();
    super.save(newData);
  }

  getNextNumericCode() {
    const latestService = this.#getLatestService();
    return latestService?.numericCode || 0;
  }

  #generateNextNumericCode() {
    const latestService = this.#getLatestService();
    const latestNumericCode = latestService?.numericCode || 0;
    return latestNumericCode + 1;
  }

  #getLatestService() {
    return this.findAll().pop() || null;
  }
}

export const serviceRepository = new ServiceRepository();
