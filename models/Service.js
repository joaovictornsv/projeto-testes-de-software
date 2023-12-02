import { generateRandomId } from '../utils/utils.js';
import { Appointment } from './Appointment.js';
import { Dentist } from './Dentist.js';
import { Patient } from './Patient.js';
import { ServiceStatus } from '../enums/ServiceStatus.js';
import { AppointmentReasons } from '../enums/AppointmentReasons.js';

const cpfRegex =
  /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}-?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}-?[0-9]{2})/;

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
  status;
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
      status: ServiceStatus.IN_APPOINTMENT.name,
      createdAt: this.createdAt,
    });
  }

  addDetails(appointmentDetails) {
    if (!appointmentDetails) {
      throw new Error('Invalid appointment details');
    }
    if (appointmentDetails.length < 10) {
      throw new Error('Please provide details in at least 10 characters');
    }
    if (appointmentDetails.length > 100) {
      throw new Error(
        'Please provide details with a maximum of 100 characters',
      );
    }
    this.details = appointmentDetails;
    this.status = ServiceStatus.DONE.name;
    this.serviceRepository.update(this.id, {
      details: this.details,
      status: this.status,
    });
  }

  verifyPatientRegisterByName(patientName) {
    if (!patientName) {
      throw new Error('Empty patient name is invalid!');
    }
    if (patientName.length < 3) {
      throw new Error('Name has less than 3 characters');
    }
    return this.patientRepository.findByName(patientName);
  }

  registerPatient(patientData) {
    this.#validatePatientData(patientData);
    const { documentNumber, name, birthDate, address, phoneNumbers } =
      patientData;
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
    if (!doctorName) {
      throw new Error('Invalid doctor name!');
    }
    if (!AppointmentReasons[appointmentType]) {
      throw new Error('Invalid appointment type!');
    }
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

  #validatePatientData(patientData) {
    if (!patientData) {
      throw new Error(
        'Por favor, forneça todos os dados necessários antes de prosseguir',
      );
    }

    const { documentNumber, name, birthDate, address, phoneNumbers } =
      patientData;
    if (!documentNumber || !name || !birthDate || !address || !phoneNumbers) {
      throw new Error(
        'Por favor, forneça todos os dados necessários antes de prosseguir',
      );
    }

    if (!documentNumber.match(cpfRegex)) {
      throw new Error('Por favor, forneça um CPF válido');
    }
  }
}
