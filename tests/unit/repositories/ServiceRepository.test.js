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
