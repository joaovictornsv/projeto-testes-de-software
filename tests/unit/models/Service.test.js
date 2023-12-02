import { describe, test, expect, beforeEach } from 'vitest';
import { Service } from '../../../models/Service.js';
import { generateRandomId } from '../../../utils/utils.js';
import { generateFakeService } from '../../utils/CreateFakeData.js';
import { fakePatientRepository } from '../../../repositories/PatientRepository.js';
import { fakeAppointmentRepository } from '../../../repositories/AppointmentRepository.js';
import { fakeServiceRepository } from '../../../repositories/ServiceRepository.js';

describe('Service', () => {
  beforeEach(() => {
    fakePatientRepository.clear();
    fakeAppointmentRepository.clear();
    fakeServiceRepository.clear();
  });

  test('constructor', () => {
    const attendantId = generateRandomId();
    const service = new Service(
      { attendantId },
      {
        patientRepository: fakePatientRepository,
        serviceRepository: fakeServiceRepository,
        appointmentRepository: fakeAppointmentRepository,
      },
    );
    expect(service.attendantId).toEqual(attendantId);
  });

  test('addDetails', () => {
    const service = generateFakeService();
    const details = 'Details example';
    service.addDetails(details);
    expect(service.details).toEqual(details);
  });
});
