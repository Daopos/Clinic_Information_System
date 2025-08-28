import { Appointment, statusEnum } from "../entities/Appointment";
import { User } from "../entities/User";
import { IAppointment } from "../interfaces/IAppointment";
import IUser from "../interfaces/IUser";
import { ApiError } from "../middleware/errorHandler";

class AppointmentService {
  constructor(private _repo: IAppointment, private _repoUser: IUser) {}

  public async createAppointment(
    data: Partial<Appointment>
  ): Promise<Appointment> {
    const patient = this._repoUser.findById((data.patient as User).id);

    if (!patient) {
      throw new ApiError("Patient not found", 404);
    }

    try {
      const appointment = await this._repo.create(data);

      return appointment;
    } catch (err) {
      throw new ApiError(err);
    }
  }

  public async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = this._repo.findById(id);

    if (!appointment) {
      throw new ApiError("Appoitnment Not Found", 404);
    }

    return appointment;
  }

  public async getAllAppointments(): Promise<Appointment[]> {
    return await this._repo.getAll();
  }

  public async getAppointmentsByPatientId(id: number): Promise<Appointment[]> {
    return await this._repo.getByPatientId(id);
  }

  public async approveAppointment(
    id: number,
    data: Pick<Appointment, "dentistId" | "app_date" | "status">
  ): Promise<Appointment> {
    const appointment = await this._repo.findById(id);

    if (!appointment) {
      throw new ApiError("Appointment Not found", 404);
    }

    // ✅ Only check conflicts if status is pending
    if (data.status === statusEnum.Pending) {
      const checkAppDate = await this._repo.checkAppDate(data.app_date);

      if (checkAppDate) {
        throw new ApiError("Appointment already booked.", 409);
      }
    }

    const dentist = await this._repoUser.findById(data.dentistId);

    if (!dentist) {
      throw new ApiError("Dentist Not found", 404);
    }

    try {
      return await this._repo.approveAppointment(id, data);
    } catch (err: any) {
      throw new ApiError(err.message || err, 500);
    }
  }
}

export default AppointmentService;
