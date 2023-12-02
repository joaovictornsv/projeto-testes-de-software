import { BaseRepository } from './BaseRepository.js';

export class ServiceRepository extends BaseRepository {
  findById(id) {
    if (!id) {
      throw new Error('Informe um número de atendimento');
    }
    return super.findById(id);
  }

  save(newData) {
    newData.numericCode = this.#generateNextNumericCode();
    super.save(newData);
  }

  getNextNumericCode() {
    const latestService = this.#getLatestService();
    return (latestService?.numericCode || 0) + 1;
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
export const fakeServiceRepository = new ServiceRepository();
