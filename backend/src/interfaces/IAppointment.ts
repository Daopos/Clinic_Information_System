import { Appointment } from "../entities/Appointment";

export interface IAppointment {
  create(data: Partial<Appointment>): Promise<Appointment>;
  findById(id: number): Promise<Appointment | null>;
  getAll(): Promise<Appointment[]>;
}
