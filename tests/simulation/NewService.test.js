import { describe, expect, test } from 'vitest';
import { Patient } from '../../classes/Patient.js';
import { ServiceRepository } from '../../repositories/ServiceRepository.js';
import { AppointmentRepository } from '../../repositories/AppointmentRepository.js';
import { Dentist } from '../../classes/Dentist.js';
import { Attendant } from '../../classes/Attendant.js';
import { AppointmentReasons } from '../../enums/AppointmentReasons.js';
import { AppointmentStatus } from '../../enums/AppointmentStatus.js';
import { NewService } from '../../setup/NewService.js';

describe('New service', () => {
  test('execute', () => {
    const patient = new Patient();
    const dentist = new Dentist();
    const attendant = new Attendant();
    const serviceRepository = new ServiceRepository();
    const appointmentRepository = new AppointmentRepository();

    const appointmentReason = AppointmentReasons.ROUTINE.name;
    const newService = new NewService({
      appointmentRepository,
      serviceRepository,
    });
    const { service, appointment } = newService.execute({
      patientId: patient.id,
      dentistId: dentist.id,
      attendantId: attendant.id,
      appointmentReason,
    });

    expect(appointmentRepository.findById(appointment.id)).toBeTruthy();
    expect(appointment.patientId).toEqual(patient.id);
    expect(appointment.dentistId).toEqual(dentist.id);
    expect(appointment.type).toEqual(appointmentReason);
    expect(appointment.status).toEqual(
      AppointmentStatus.WAITING_FOR_SERVICE.name,
    );
    expect(serviceRepository.findById(service.id)).toBeTruthy();
    expect(service.patientId).toEqual(patient.id);
    expect(service.dentistId).toEqual(dentist.id);
    expect(service.attendantId).toEqual(attendant.id);
    expect(service.appointmentId).toEqual(appointment.id);
  });
});
