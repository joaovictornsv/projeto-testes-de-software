import { Patient } from '../../models/Patient';
import { Appointment } from '../../models/Appointment';
import { Service } from '../../models/Service';
import { generateRandomId } from '../../utils/utils';
import { fakePatientRepository } from '../../repositories/PatientRepository.js';
import { fakeAppointmentRepository } from '../../repositories/AppointmentRepository.js';
import { fakeServiceRepository } from '../../repositories/ServiceRepository.js';
import { AppointmentReasons } from '../../enums/AppointmentReasons.js';

export const generateFakePatient = (name) => {
  return new Patient(
    {
      documentNumber: '098.987.876-00',
      name: name,
      birthDate: new Date(),
      address: 'Dinamérica IF',
      phoneNumbers: ['(83) 99983-1234', '2325-2324'],
    },
    { patientRepository: fakePatientRepository },
  );
};

export const generateFakeAppointment = (patientId, appointmentType) => {
  return new Appointment(
    {
      dentistId: generateRandomId(),
      appointmentType,
      patientId,
    },
    { appointmentRepository: fakeAppointmentRepository },
  );
};

export const generateFakeService = () => {
  return new Service(
    {
      attendantId: generateRandomId(),
    },
    {
      patientRepository: fakePatientRepository,
      serviceRepository: fakeServiceRepository,
      appointmentRepository: fakeAppointmentRepository,
    },
  );
};

export const generateFakeServiceWithAppointment = () => {
  const service = generateFakeService();
  const patient = generateFakePatient('Luis');
  service.registerPatient({
    documentNumber: patient.documentNumber,
    name: patient.name,
    birthDate: patient.birthDate,
    address: patient.address,
    phoneNumbers: patient.phoneNumbers,
  });
  service.registerAppointment({
    doctorName: 'Henrique',
    appointmentType: AppointmentReasons.TOOTHACHE.name,
  });
  return service;
};
