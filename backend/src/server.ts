import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import UserRoutes from "./routes/UserRoutes";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

class server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
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
    this.app.use("/api/v1", UserRoutes);
  }

  private serve(): void {
    const PORT: number = Number(process.env.PORT);

    this.app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
  }
}

export default new server().app;
