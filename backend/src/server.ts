import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./config/data-source";
import UserRoutes from "./routes/UserRoutes";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import medicineRoutes from "./routes/medicineRoutes";
dotenv.config();

class server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cookieParser()); // 👈 Enables req.cookies
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:5173", // your frontend origin
        credentials: true, // allow cookies to be sent
      })
    );
    //initialize functions
    this.connectDB();
    this.routes();
    this.middleware();
    this.serve();
  }

  private middleware(): void {
    this.app.use(errorHandler);
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
  }

  private serve(): void {
    const PORT: number = Number(process.env.PORT);

    this.app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
  }
}

export default new server().app;
