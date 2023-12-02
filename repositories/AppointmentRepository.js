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

  findAppointmentsByPatientId(patientId, appointmentType = null) {
    return this._data.filter(
      (appointment) =>
        appointment.patientId === patientId &&
        (!appointmentType || appointment.type === appointmentType),
    );
  }
}

export const appointmentRepository = new AppointmentRepository();
export const fakeAppointmentRepository = new AppointmentRepository();
