import { generateRandomId } from '../utils/utils.js';
import { patientRepository } from '../repositories/PatientRepository.js';
import { Appointment } from './Appointment.js';
import { Dentist } from './Dentist.js';
import { serviceRepository } from '../repositories/ServiceRepository.js';
import { Patient } from './Patient.js';

// Atendimento
export class Service {
  id;
  patientId;
  dentistId;
  attendantId;
  appointmentId;
  details;
  numericCode;
  createdAt;

  constructor({ attendantId }) {
    this.id = generateRandomId();
    this.attendantId = attendantId;
    this.createdAt = new Date();
    serviceRepository.save({
      id: this.id,
      attendantId: this.attendantId,
      status: this.status,
      createdAt: this.createdAt,
    });
  }

  addDetails(appointmentDetails) {
    this.details = appointmentDetails;
    serviceRepository.update(this.id, { details: this.details });
  }

  verifyPatientRegisterByName(patientName) {
    return patientRepository.findByName(patientName);
  }

  registerPatient({ documentNumber, name, birthDate, address, phoneNumbers }) {
    const patient = new Patient({
      documentNumber,
      name,
      birthDate,
      address,
      phoneNumbers,
    });
    this.patientId = patient.id;
    serviceRepository.update(this.id, { patientId: this.patientId });
  }

  registerAppointment({ doctorName, appointmentType }) {
    const dentist = new Dentist(doctorName);
    const appointment = new Appointment({
      appointmentType,
      dentistId: dentist.id,
      patientId: this.patientId,
    });
    this.dentistId = dentist.id;
    this.appointmentId = appointment.id;
    serviceRepository.update(this.id, {
      dentistId: this.dentistId,
      appointmentId: this.appointmentId,
    });
    return appointment;
  }
}
