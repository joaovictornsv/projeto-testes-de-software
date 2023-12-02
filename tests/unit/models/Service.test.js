import { describe, test, expect, beforeEach } from 'vitest';
import { Service } from '../../../models/Service.js';
import { generateRandomId } from '../../../utils/utils.js';
import { generateFakeService } from '../../utils/CreateFakeData.js';
import { fakePatientRepository } from '../../../repositories/PatientRepository.js';
import { fakeAppointmentRepository } from '../../../repositories/AppointmentRepository.js';
import { fakeServiceRepository } from '../../../repositories/ServiceRepository.js';
import { AppointmentReasons } from '../../../enums/AppointmentReasons.js';
import { ServiceStatus } from '../../../enums/ServiceStatus.js';

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

  test('registerAppointment - Invalid doctor name', () => {
    // create
    const doctorName = null;
    const appointmentType = AppointmentReasons.TOOTHACHE.name;
    const service = generateFakeService();

    // expect
    expect(() =>
      service.registerAppointment({ doctorName, appointmentType }),
    ).toThrow('Invalid doctor name!');
  });

  test('registerAppointment - Invalid appointment type!', () => {
    // create
    const doctorName = 'Henrique';
    const appointmentType = 'Exame laboratorial';
    const service = generateFakeService();

    // expect
    expect(() =>
      service.registerAppointment({ doctorName, appointmentType }),
    ).toThrow('Invalid appointment type!');
  });

  test('addDetails - empty details', () => {
    // create
    const service = generateFakeService();
    const appointmentDetails = null;

    // expect
    expect(() => service.addDetails(appointmentDetails)).toThrow(
      'Invalid appointment details',
    );
  });

  test('addDetails - Cárie dentária', () => {
    // create
    const service = generateFakeService();
    const appointmentDetails = 'Paciente com cárie dentária';

    // action
    service.addDetails(appointmentDetails);

    // expected
    expect(service.status).toEqual(ServiceStatus.DONE.name);
    expect(service.details).toEqual(appointmentDetails);
  });

  test('addDetails - Less than 10 characters', () => {
    // create
    const service = generateFakeService();
    const appointmentDetails = 'Cárie';

    // expected
    expect(() => service.addDetails(appointmentDetails)).toThrow(
      'Please provide details in at least 10 characters',
    );
  });

  test('addDetails - More than 100 characters', () => {
    // create
    const service = generateFakeService();
    const appointmentDetails =
      'Durante um diagnóstico dentário abrangente, o dentista examina minuciosamente a saúde bucal, avalia a condição dos dentes, gengivas e estruturas adjacentes, utilizando técnicas avançadas e radiografias para identificar cáries, doenças periodontais ou problemas de alinhamento. Esse processo é crucial para um plano de tratamento preciso e personalizado, visando manter a saúde oral e prevenir complicações futuras';

    // expected
    expect(() => service.addDetails(appointmentDetails)).toThrow(
      'Please provide details with a maximum of 100 characters',
    );
  });
});
