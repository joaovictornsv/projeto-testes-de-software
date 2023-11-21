import { BaseRepository } from './BaseRepository.js';

export class PatientRepository extends BaseRepository {
  findByName(name) {
    return this._data.find((patient) => patient.name === name) || null;
  }
}

export const patientRepository = new PatientRepository();
export const fakePatientRepository = new PatientRepository();
