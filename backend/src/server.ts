import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./config/data-source";
import UserRoutes from "./routes/UserRoutes";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import medicineRoutes from "./routes/MedicineRoutes";
import { errorValidation } from "./middleware/validationExeption";
import StockRoutes from "./routes/StockRoutes";
import MedicineLogRoutes from "./routes/MedicineLogRoutes";
import AppointmentRoutes from "./routes/AppointmentRoutes";
dotenv.config();

class server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cookieParser()); // 👈 Enables req.cookies
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:8081"], // your frontend origin
        credentials: true, // allow cookies to be sent
      })
    );

    //initialize functions
    this.connectDB();
    this.routes();
    this.app.use(errorValidation);
    this.app.use(errorHandler);
    this.serve();
  }
  private connectDB(): void {
    AppDataSource.initialize()
      .then(() => console.log("database connected"))
      .catch((err) => console.log(`Database connection error: ${err}`));
  }

  private routes(): void {
    //user Routes
    this.app.use("/api/v1", UserRoutes);

    //medicine Routes
    this.app.use("/api/v1", medicineRoutes);

    //medicine stock Routes
    this.app.use("/api/v1", StockRoutes);

    //medicine log Routes
    this.app.use("/api/v1", MedicineLogRoutes);

    //Appointment Routes
    this.app.use("/api/v1", AppointmentRoutes);
  }

  private serve(): void {
    const PORT: number = Number(process.env.PORT);

    this.app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
  }
}

export default new server().app;
