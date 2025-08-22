import { Appointment } from "../entities/Appointment";
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
}

export default AppointmentService;
