import { BaseRepository } from './BaseRepository.js';

export class PatientRepository extends BaseRepository {
  getPatientByName(name) {
    return this._data.find((patient) => patient.name === name) || null
  }
}
