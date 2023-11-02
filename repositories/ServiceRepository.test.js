import { describe, expect, test } from 'vitest';
import { Service } from '../classes/Service.js';
import { generateRandomId } from '../utils/utils.js';
import { ServiceRepository } from './ServiceRepository.js';

const generateFakeService = () =>
  new Service({
    dentistId: generateRandomId(),
    patientId: generateRandomId(),
    appointmentId: generateRandomId(),
    attendantId: generateRandomId(),
  });

describe('ServiceRepository', () => {
  test('save', () => {
    const serviceRepository = new ServiceRepository();
    const service = generateFakeService();
    serviceRepository.save(service);

    expect(serviceRepository.length()).toEqual(1);
  });

  test('getNextNumericCode', () => {
    const serviceRepository = new ServiceRepository();
    const service1 = generateFakeService();
    const service2 = generateFakeService();
    const service3 = generateFakeService();

    serviceRepository.save(service1);
    expect(serviceRepository.getNextNumericCode()).toEqual(1);

    serviceRepository.save(service2);
    expect(serviceRepository.getNextNumericCode()).toEqual(2);

    serviceRepository.save(service3);
    expect(serviceRepository.getNextNumericCode()).toEqual(3);
  });
});
