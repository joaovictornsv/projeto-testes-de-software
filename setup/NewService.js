import { Appointment } from '../classes/Appointment.js';
import { Service } from '../classes/Service.js';

export class NewService {
  #appointmentRepository;
  #serviceRepository;

  constructor({ appointmentRepository, serviceRepository }) {
    (this.#appointmentRepository = appointmentRepository),
      (this.#serviceRepository = serviceRepository);
  }

  execute({ patientId, attendantId, dentistId, appointmentReason }) {
    const appointment = new Appointment({
      dentistId,
      patientId,
      type: appointmentReason,
    });
    this.#appointmentRepository.save(appointment);

    const service = new Service({
      dentistId,
      patientId,
      attendantId,
      appointmentId: appointment.id,
    });
    this.#serviceRepository.save(service);

    return { service, appointment };
  }
}
