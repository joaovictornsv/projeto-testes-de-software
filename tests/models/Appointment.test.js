import { describe, expect, test } from 'vitest';
import {
  generateFakeAppointment,
  generateFakeService,
} from '../utils/CreateFakeData';
import { PaymentStatus } from '../../enums/PaymentTypes';
import { AppointmentStatus } from '../../enums/AppointmentStatus';

describe('Appointment', () => {
  // Integration
  test('addProcedure', () => {
    // create
    const service = generateFakeService();
    const appointment = generateFakeAppointment(
      service.patientId,
      'Dor de dente',
    );
    const details = 'Extração';
    const amount = 500.0;

    // action
    appointment.addProcedure({ details, amount });

    // expected
    expect(appointment.procedures[0].details).toEqual(details);
    expect(appointment.procedures[0].amount).toEqual(amount);
  });

  // Integration
  test('calculateAmount', () => {
    // create
    const service = generateFakeService();
    const appointment = generateFakeAppointment(
      service.patientId,
      'Dor de dente',
    );
    const procedures = [
      ['Extração', 500.0],
      ['Limpeza', 200.0],
    ];

    // action
    procedures.forEach(([details, amount]) => {
      appointment.addProcedure({ details, amount });
    });
    appointment.calculateAmount();

    // expected
    const total = 700.0;
    expect(appointment.amount).toEqual(total);
  });

  // Integration
  test('pay->paidOut', () => {
    // create
    const service = generateFakeService();
    const appointment = generateFakeAppointment(
      service.patientId,
      'Dor de dente',
    );
    appointment.createdAt = new Date('November 1, 2023');
    const payDate = new Date('November 17, 2023');
    const details = 'Extração';
    const amount = 500.0;

    // action 1 - do procedure
    appointment.addProcedure({ details, amount });

    // expected 1 - wait payment
    expect(appointment.paymentStatus).toEqual(
      PaymentStatus.WAITING_PAYMENT.name,
    );

    // action 2 - pay
    appointment.calculateAmount();
    appointment.pay(payDate);

    // expected 2 - paid out
    const total = 500.0;
    expect(appointment.amount).toEqual(total);
    expect(appointment.paymentStatus).toEqual(PaymentStatus.PAID_OUT.name);
  });

  // Integration
  test('pay->overdue', () => {
    // create
    const service = generateFakeService();
    const appointment = generateFakeAppointment(
      service.patientId,
      'Dor de dente',
    );
    appointment.createdAt = new Date('November 1, 2023');
    const payDate = new Date('December 17, 2023');
    const details = 'Extração';
    const amount = 500.0;

    // action 1 - do procedure
    appointment.addProcedure({ details, amount });

    // expected 1 - wait payment
    expect(appointment.paymentStatus).toEqual(
      PaymentStatus.WAITING_PAYMENT.name,
    );

    // action 2 - pay
    appointment.calculateAmount();
    appointment.pay(payDate);

    // expected 2 - paid out
    const total = 550.0;
    expect(appointment.amount).toEqual(total);
    expect(appointment.paymentStatus).toEqual(PaymentStatus.OVERDUE.name);
  });

  // Unit
  test('done', () => {
    // create
    const service = generateFakeService();
    const appointment = generateFakeAppointment(
      service.patientId,
      'Dor de dente',
    );

    // action
    appointment.done();

    // expected
    expect(appointment.status).toEqual(AppointmentStatus.DONE.name);
  });
});
