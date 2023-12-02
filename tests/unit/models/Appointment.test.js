import { describe, expect, test } from 'vitest';
import {
  generateFakeAppointment,
  generateFakeService,
} from '../../utils/CreateFakeData';
import { AppointmentStatus } from '../../../enums/AppointmentStatus';

describe('Appointment', () => {
  test('done', () => {
    // create
    const service = generateFakeService();
    const appointment = generateFakeAppointment(
      service.patientId,
      'Dor de dente',
    );

    // action
    appointment.done();

    // expected
    expect(appointment.status).toEqual(AppointmentStatus.DONE.name);
  });
});
