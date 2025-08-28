import { Appointment, statusEnum } from "./../entities/Appointment";
import { Repository } from "typeorm";
import { IAppointment } from "../interfaces/IAppointment";
import { AppDataSource } from "../config/data-source";

class AppointmentRepo implements IAppointment {
  private readonly _repo: Repository<Appointment>;

  constructor() {
    this._repo = AppDataSource.getRepository(Appointment);
  }

  public async create(data: Partial<Appointment>): Promise<Appointment> {
    const appointment = this._repo.create(data);
    this._repo.save(appointment);
    return appointment;
  }

  public async findById(id: number): Promise<Appointment | null> {
    return await this._repo.findOneBy({ id });
  }

  public async getAll(): Promise<Appointment[]> {
    return await this._repo.find({ relations: ["patient"] });
  }

  public async getByPatientId(id: number): Promise<Appointment[]> {
    return await this._repo.find({ where: { patientId: id } });
  }

  public async approveAppointment(
    id: number,
    data: Pick<Appointment, "dentistId" | "app_date" | "status">
  ): Promise<Appointment> {
    await this._repo.update(id, data);

    return await this._repo.findOneByOrFail({ id });
  }

  public async checkAppDate(app_date: Date): Promise<boolean> {
    const existing = await this._repo.findOne({
      where: {
        app_date,
        status: statusEnum.Pending, // ✅ ignore completed
      },
    });

    return !!existing;
  }
}

export default new AppointmentRepo();
