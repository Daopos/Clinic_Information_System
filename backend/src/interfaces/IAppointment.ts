import { Appointment } from "../entities/Appointment";

export interface IAppointment {
  create(data: Partial<Appointment>): Promise<Appointment>;
  findById(id: number): Promise<Appointment | null>;
  getAll(): Promise<Appointment[]>;

  getByPatientId(id: number): Promise<Appointment[]>;

  approveAppointment(
    id: number,
    data: Pick<Appointment, "dentistId" | "app_date" | "status">
  ): Promise<Appointment>;

  checkAppDate(app_date: Date): Promise<boolean>;
}
