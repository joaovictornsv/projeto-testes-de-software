import { describe, expect, test } from 'vitest';
import { generateFakeService } from '../../utils/CreateFakeData.js';
import { ServiceRepository } from '../../../repositories/ServiceRepository.js';

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
});
