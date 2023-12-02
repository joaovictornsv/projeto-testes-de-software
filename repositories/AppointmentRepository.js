import { BaseRepository } from './BaseRepository.js';
import { AppointmentStatus } from '../enums/AppointmentStatus.js';

export class AppointmentRepository extends BaseRepository {
  #totalAppointments = 0;
  #limit = 10;

  update(id, updatedData) {
    if (updatedData.status === AppointmentStatus.DONE.name) {
      this.#totalAppointments = this.#totalAppointments + 1;
    }
    return super.update(id, updatedData);
  }

  getNextAppointment() {
    if (this.#totalAppointments === this.#limit) {
      throw new Error('Limite de atendimentos diário atingido');
    }

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
