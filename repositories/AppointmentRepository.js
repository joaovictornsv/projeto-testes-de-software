import { BaseRepository } from './BaseRepository.js';
import { AppointmentStatus } from '../enums/AppointmentStatus.js';

export class AppointmentRepository extends BaseRepository {
  getNextPatient() {
    return (
      this._data
        .filter(({ status }) => AppointmentStatus[status].isWaitingForService)
        .sort((a, b) => b.createdAt - a.createdAt)
        .pop() || null
    );
  }

  getAppointmentsByPatientId(patientId) {
    return this._data.find(
      (appointment) => appointment.patientId === patientId,
    );
  }
}
