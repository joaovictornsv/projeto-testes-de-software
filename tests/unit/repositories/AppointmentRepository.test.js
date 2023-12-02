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

  test('getNextPatient - finalize current and call next patient', () => {
    // create
    const appointmentRepository = new AppointmentRepository();

    const patient1 = generateFakePatient('Luis');
    const patient2 = generateFakePatient('João');

    const appointment1 = generateFakeAppointment(
      patient1.id,
      AppointmentReasons.ROUTINE.name,
    );
    const appointment2 = generateFakeAppointment(
      patient2.id,
      AppointmentReasons.ROUTINE.name,
    );

    appointmentRepository.save(appointment1);
    appointmentRepository.save(appointment2);

    appointment1.done();
    appointmentRepository.update(appointment1.id, {
      status: appointment1.status,
    });

    // expected
    const nextPatient = appointmentRepository.getNextAppointment();
    expect(nextPatient).toBeTruthy();
    expect(nextPatient.patientId).toEqual(patient2.id);
  });

  test('getNextPatient - finalize current and do not have next patient', () => {
    // create
    const appointmentRepository = new AppointmentRepository();

    const patient = generateFakePatient('Luis');

    const appointment = generateFakeAppointment(
      patient.id,
      AppointmentReasons.ROUTINE.name,
    );

    appointmentRepository.save(appointment);

    // expected
    expect(appointmentRepository.getNextAppointment()).toHaveProperty(
      'id',
      appointment.id,
    );
    appointment.done();
    appointmentRepository.update(appointment.id, {
      status: appointment.status,
    });

    const nextPatient = appointmentRepository.getNextAppointment();
    expect(nextPatient).toBeNull();
  });

  test('getNextPatient - finalize current and call next patient', () => {
    // create
    const appointmentRepository = new AppointmentRepository();

    // eslint-disable-next-line no-unused-vars
    for (let _ in Array(10).fill(0)) {
      const patient = generateFakePatient('Luis');
      const appointment = generateFakeAppointment(
        patient.id,
        AppointmentReasons.ROUTINE.name,
      );
      appointmentRepository.save(appointment);
      appointment.done();

      appointmentRepository.update(appointment.id, {
        status: appointment.status,
      });
    }

    // expected
    expect(() => appointmentRepository.getNextAppointment()).toThrow(
      'Limite de atendimentos diário atingido',
    );
  });

  test('getNextPatient - do not have next patient', () => {
    // create
    const appointmentRepository = new AppointmentRepository();

    // action
    const nextPatient = appointmentRepository.getNextAppointment();

    // expected
    expect(nextPatient).toBeNull();
  });
});
