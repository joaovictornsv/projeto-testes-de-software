import { describe, test, expect, beforeEach } from 'vitest';
import { Service } from '../../models/Service.js';
import { generateRandomId } from '../../utils/utils.js';
import {
  generateFakePatient,
  generateFakeService,
} from '../utils/CreateFakeData.js';
import { fakePatientRepository } from '../../repositories/PatientRepository.js';
import { AppointmentReasons } from '../../enums/AppointmentReasons.js';
import { fakeAppointmentRepository } from '../../repositories/AppointmentRepository.js';
import { fakeServiceRepository } from '../../repositories/ServiceRepository.js';

describe('Service', () => {
  beforeEach(() => {
    fakePatientRepository.clear();
    fakeAppointmentRepository.clear();
    fakeServiceRepository.clear();
  });
  // Unit
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

  // Unit
  test('addDetails', () => {
    const service = generateFakeService();
    const details = 'Details example';
    service.addDetails(details);
    expect(service.details).toEqual(details);
  });

  // Integration
  test('verifyPatientRegisterByName', () => {
    const patient = generateFakePatient();
    const service = generateFakeService();

    const patientFound = service.verifyPatientRegisterByName(patient.name);

    expect(patientFound).toBeTruthy();
    expect(patientFound.id).toEqual(patient.id);
    expect(patientFound.name).toEqual(patient.name);
  });

  // Integration
  test('verifyPatientRegisterByName - patient not found', () => {
    const service = generateFakeService();
    const patientFound = service.verifyPatientRegisterByName('Example name');

    expect(patientFound).toBeNull();
  });

  // Integration
  test('registerPatient', () => {
    const patientData = {
      name: 'João',
      address: 'Rua José Maria, 130',
      phoneNumbers: ['99999999999'],
      documentNumber: '000.000.000-00',
      birthDate: new Date(),
    };
    const service = generateFakeService();
    service.registerPatient(patientData);

    expect(service.patientId).toBeTruthy();
    expect(fakePatientRepository.length()).toEqual(1);
  });

  // Integration
  test('registerAppointment', () => {
    const doctorName = 'Fernando';
    const appointmentType = AppointmentReasons.TOOTHACHE.name;
    const service = generateFakeService();
    const patientData = {
      name: 'João',
      address: 'Rua José Maria, 130',
      phoneNumbers: ['99999999999'],
      documentNumber: '000.000.000-00',
      birthDate: new Date(),
    };
    service.registerPatient(patientData);

    const appointment = service.registerAppointment({
      doctorName,
      appointmentType,
    });

    expect(service.dentistId).toBeTruthy();
    expect(service.appointmentId).toEqual(appointment.id);

    expect(appointment.type).toEqual(appointmentType);

    expect(fakePatientRepository.length()).toEqual(1);
  });
});