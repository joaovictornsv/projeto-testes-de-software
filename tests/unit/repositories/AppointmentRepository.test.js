import { describe, expect, test } from 'vitest';
import { AppointmentRepository } from '../../../repositories/AppointmentRepository.js';
import {
  generateFakeAppointment,
  generateFakePatient,
} from '../../utils/CreateFakeData.js';
import { AppointmentReasons } from '../../../enums/AppointmentReasons.js';

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
