import { generateRandomId } from '../utils/utils.js';
import { Appointment } from './Appointment.js';
import { Dentist } from './Dentist.js';
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
  serviceRepository;
  patientRepository;
  appointmentRepository;

  constructor(
    { attendantId },
    { serviceRepository, patientRepository, appointmentRepository },
  ) {
    this.id = generateRandomId();
    this.attendantId = attendantId;
    this.createdAt = new Date();

    this.serviceRepository = serviceRepository;
    this.patientRepository = patientRepository;
    this.appointmentRepository = appointmentRepository;

    this.serviceRepository.save({
      id: this.id,
      attendantId: this.attendantId,
      status: this.status,
      createdAt: this.createdAt,
    });
  }

  addDetails(appointmentDetails) {
    this.details = appointmentDetails;
    this.serviceRepository.update(this.id, { details: this.details });
  }

  verifyPatientRegisterByName(patientName) {
    return this.patientRepository.findByName(patientName);
  }

  registerPatient({ documentNumber, name, birthDate, address, phoneNumbers }) {
    const patient = new Patient(
      {
        documentNumber,
        name,
        birthDate,
        address,
        phoneNumbers,
      },
      { patientRepository: this.patientRepository },
    );
    this.patientId = patient.id;
    this.serviceRepository.update(this.id, { patientId: this.patientId });
  }

  registerAppointment({ doctorName, appointmentType }) {
    const dentist = new Dentist(doctorName);
    const appointment = new Appointment(
      {
        appointmentType,
        dentistId: dentist.id,
        patientId: this.patientId,
      },
      { appointmentRepository: this.appointmentRepository },
    );
    this.dentistId = dentist.id;
    this.appointmentId = appointment.id;
    this.serviceRepository.update(this.id, {
      dentistId: this.dentistId,
      appointmentId: this.appointmentId,
    });
    return appointment;
  }
}
