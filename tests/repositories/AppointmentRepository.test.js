import { describe, expect, test } from 'vitest';
import { AppointmentRepository } from '../../repositories/AppointmentRepository.js';
import { Appointment } from '../../models/Appointment.js';
import { Patient } from '../../models/Patient.js';
import { generateRandomId } from '../../utils/utils.js';
import { AppointmentReasons } from '../../enums/AppointmentReasons.js';

const generateFakePatient = (name) => {
  return new Patient({
    documentNumber: '098.987.876-00',
    name: name,
    birthDate: new Date(),
    address: 'Rua Rensilson Bivar',
    phoneNumbers: ['(83) 99983-1234', '2325-2324'],
  });
};

const generateFakeAppointment = (patientId, appointmentType) => {
  return new Appointment({
    dentistId: generateRandomId(),
    appointmentType,
    patientId,
  });
};

describe('AppointmentRepository', () => {
  test('save', () => {
    // create
    const appointmentRepository = new AppointmentRepository();
    const patient = generateFakePatient('Luis');
    const appointment = generateFakeAppointment(
      patient.id,
      AppointmentReasons.ROUTINE.name,
    );

    // action
    appointmentRepository.save(appointment);

    // expected
    expect(appointmentRepository.findById(appointment.id)).toBeTruthy();
  });

  test('getNextPatient', () => {
    // create
    const appointmentRepository = new AppointmentRepository();

    const patient = generateFakePatient('Luis');

    const appointment = generateFakeAppointment(
      patient.id,
      AppointmentReasons.ROUTINE.name,
    );

    appointmentRepository.save(appointment);

    // expected
    expect(appointmentRepository.getNextPatient()).toHaveProperty(
      'id',
      appointment.id,
    );
    appointment.done();
    appointmentRepository.update(appointment.id, {
      status: appointment.status,
    });

    expect(appointmentRepository.getNextPatient()).toBeNull();
  });

  test('getNextPatient - patient null', () => {
    // create
    const appointmentRepository = new AppointmentRepository();

    // action
    const nextPatient = appointmentRepository.getNextPatient();

    // expected
    expect(nextPatient).toBeNull();
  });
});
