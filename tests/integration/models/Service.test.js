import { describe, test, expect, beforeEach } from 'vitest';
import {
  generateFakePatient,
  generateFakeService,
} from '../../utils/CreateFakeData.js';
import { fakePatientRepository } from '../../../repositories/PatientRepository.js';
import { AppointmentReasons } from '../../../enums/AppointmentReasons.js';
import { fakeAppointmentRepository } from '../../../repositories/AppointmentRepository.js';
import { fakeServiceRepository } from '../../../repositories/ServiceRepository.js';
import { ServiceStatus } from '../../../enums/ServiceStatus.js';
import { generateRandomId } from '../../../utils/utils.js';
import { Service } from '../../../models/Service.js';

describe('Service', () => {
  beforeEach(() => {
    fakePatientRepository.clear();
    fakeAppointmentRepository.clear();
    fakeServiceRepository.clear();
  });

  test('verifyPatientRegisterByName - patient found', () => {
    const patient = generateFakePatient('Luis');
    const service = generateFakeService();

    const patientFound = service.verifyPatientRegisterByName(patient.name);

    expect(patientFound).toBeTruthy();
    expect(patientFound.id).toEqual(patient.id);
    expect(patientFound.name).toEqual(patient.name);
  });

  test('verifyPatientRegisterByName - patient not found', () => {
    const service = generateFakeService();
    const patientFound = service.verifyPatientRegisterByName('Example name');

    expect(patientFound).toBeNull();
  });

  test('registerPatient - without pass patient data', () => {
    const service = generateFakeService();
    expect(() => service.registerPatient()).toThrow(
      'Por favor, forneça todos os dados necessários antes de prosseguir',
    );
  });

  test('registerPatient - pass patient data with missing fields', () => {
    const service = generateFakeService();
    expect(() => service.registerPatient({ name: 'João' })).toThrow(
      'Por favor, forneça todos os dados necessários antes de prosseguir',
    );
  });

  test('verifyPatientRegisterByName - empty name', () => {
    // create
    const service = generateFakeService();

    // expected
    expect(() => service.verifyPatientRegisterByName()).toThrow(
      'Empty patient name is invalid!',
    );
  });

  test('verifyPatientRegisterByName - less than 3 characters', () => {
    // create
    const service = generateFakeService();

    // expected
    expect(() => service.verifyPatientRegisterByName('J')).toThrow(
      'Name has less than 3 characters',
    );
  });

  test('registerPatient - pass patient data with invalid document number', () => {
    const patientData = {
      name: 'João',
      address: 'Rua Euzébia Neder, 348',
      phoneNumbers: ['(99) 8877-6655'],
      documentNumber: '000',
      birthDate: new Date('28/02/1999'),
    };
    const service = generateFakeService();
    expect(() => service.registerPatient(patientData)).toThrow(
      'Por favor, forneça um CPF válido',
    );
  });

  test('registerPatient ', () => {
    const patientData = {
      name: 'João',
      address: 'Rua Euzébia Neder, 348',
      phoneNumbers: ['(99) 8877-6655'],
      documentNumber: '000.000.000-00',
      birthDate: new Date('28/02/1999'),
    };
    const service = generateFakeService();
    service.registerPatient(patientData);

    expect(service.patientId).toBeTruthy();
    expect(fakePatientRepository.length()).toEqual(1);
  });

  test('registerAppointment - TOOTHACHE', () => {
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

  test('registerAppointment - ROUTINE', () => {
    const doctorName = 'Fernando';
    const appointmentType = AppointmentReasons.ROUTINE.name;
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
