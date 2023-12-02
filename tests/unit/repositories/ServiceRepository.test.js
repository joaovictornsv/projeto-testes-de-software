import { describe, expect, test } from 'vitest';
import {
  generateFakeService,
  generateFakeServiceWithAppointment,
} from '../../utils/CreateFakeData.js';
import { ServiceRepository } from '../../../repositories/ServiceRepository.js';
import { AppointmentReasons } from '../../../enums/AppointmentReasons.js';
import { ServiceStatus } from '../../../enums/ServiceStatus.js';

describe('ServiceRepository', () => {
  test('save', () => {
    const serviceRepository = new ServiceRepository();
    const service = generateFakeService();
    serviceRepository.save(service);

    expect(serviceRepository.findById(service.id)).toBeTruthy();
  });

  test('getNextNumericCode - first patient', () => {
    const serviceRepository = new ServiceRepository();

    expect(serviceRepository.getNextNumericCode()).toEqual(1);
  });

  test('getNextNumericCode - second patient', () => {
    const serviceRepository = new ServiceRepository();
    const service = generateFakeService();
    serviceRepository.save(service);

    expect(serviceRepository.getNextNumericCode()).toEqual(2);
  });

  test('getNextNumericCode - 10th patient', () => {
    const serviceRepository = new ServiceRepository();
    // eslint-disable-next-line no-unused-vars
    for (let _ in Array(9).fill(0)) {
      serviceRepository.save(generateFakeService());
    }

    expect(serviceRepository.getNextNumericCode()).toEqual(10);
  });

  test('getNextNumericCode - 50th patient', () => {
    const serviceRepository = new ServiceRepository();
    // eslint-disable-next-line no-unused-vars
    for (let _ in Array(49).fill(0)) {
      serviceRepository.save(generateFakeService());
    }

    expect(serviceRepository.getNextNumericCode()).toEqual(50);
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

  test('find service by id - service not finalized', () => {
    // create
    const serviceRepository = new ServiceRepository();
    const service = generateFakeServiceWithAppointment();
    serviceRepository.save(service);

    const serviceFound = serviceRepository.findById(service.id);
    expect(serviceFound).toBeTruthy();
    expect(serviceFound.id).toEqual(service.id);
    expect(serviceFound.attendantId).toEqual(service.attendantId);
    expect(serviceFound.createdAt).toEqual(service.createdAt);
    expect(serviceFound.status).toEqual(ServiceStatus.IN_SERVICE.name);
  });

  test('find service by id - service finalized', () => {
    // create
    const serviceRepository = new ServiceRepository();
    const service = generateFakeServiceWithAppointment();
    service.addDetails('Example details');
    serviceRepository.save(service);

    const serviceFound = serviceRepository.findById(service.id);
    expect(serviceFound).toBeTruthy();
    expect(serviceFound.id).toEqual(service.id);
    expect(serviceFound.details).toEqual(service.details);
    expect(serviceFound.attendantId).toEqual(service.attendantId);
    expect(serviceFound.createdAt).toEqual(service.createdAt);
    expect(serviceFound.status).toEqual(ServiceStatus.DONE.name);
  });

  test('find service by id - service not found', () => {
    const serviceRepository = new ServiceRepository();

    const serviceFound = serviceRepository.findById('xxx');
    expect(serviceFound).toBeNull();
  });

  test('find service by id - missing service id param', () => {
    const serviceRepository = new ServiceRepository();

    expect(() => serviceRepository.findById()).toThrow(
      'Informe um número de atendimento',
    );
  });
});
