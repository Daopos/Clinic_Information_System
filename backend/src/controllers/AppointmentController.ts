import { NextFunction, Response, Request } from "express";
import AppointmentRepo from "../repositories/AppointmentRepo";
import AppointmentService from "../services/AppoinmentService";
import { validateDto } from "../util/validationDto";
import { CreateAppointmentDto } from "../Dto/Appointment/CreateAppointmentDto";
import { User } from "../entities/User";
import UserRepo from "../repositories/UserRepo";
import { statusEnum } from "../entities/Appointment";

class AppointmentController {
  private readonly _appointmentService: AppointmentService;

  constructor() {
    this._appointmentService = new AppointmentService(
      AppointmentRepo,
      UserRepo
    );
  }

  public async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = (req as any).mobileId;

    try {
      const validateBody = await validateDto(CreateAppointmentDto, req.body);
      const payload = {
        ...validateBody,
        status: statusEnum.Pending,
        patient: { id: id } as User,
      };

      const appointment = await this._appointmentService.createAppointment(
        payload
      );

      res
        .status(201)
        .json({ message: "Created Successfully", responseData: appointment });
    } catch (err) {
      next(err);
    }
  }

  public async getAllAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const appointments = await this._appointmentService.getAllAppointments();

      res.status(200).json({ responseData: appointments });
    } catch (err) {
      next(err);
    }
  }

  public async getAppointmentsByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const patientId = (req as any).mobileId;

    try {
      const appointments =
        await this._appointmentService.getAppointmentsByPatientId(patientId);

      res.status(200).json({ responseData: appointments });
    } catch (err) {
      next(err);
    }
  }

  public async approveAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const DentistId = (req as any).id;
    const { id } = req.params;
    const payload = { ...req.body, dentistId: DentistId };
    try {
      const appointment = await this._appointmentService.approveAppointment(
        Number(id),
        payload
      );

      res
        .status(200)
        .json({ message: "Successful Approved", responseData: appointment });
    } catch (err) {
      next(err);
    }
  }
}

export default new AppointmentController();
