import { Repository } from "typeorm";
import { IAppointment } from "../interfaces/IAppointment";
import { Appointment } from "../entities/Appointment";
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
}

export default new AppointmentRepo();
