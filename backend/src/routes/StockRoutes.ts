import express from "express";
import StockController from "../controllers/StockController";
import authentication from "../middleware/authentication";

class StockRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/stock",
      authentication("ADMIN", "PHARMACIST"),
      StockController.createStock.bind(StockController)
    );
    this.router.get(
      "/stocks/pharmacist",
      authentication("ADMIN", "PHARMACIST"), //REMOVE ADMIN LATER
      StockController.getAllStockForPharma.bind(StockController)
    );

    this.router.put(
      "/stock/:id",
      authentication("ADMIN", "PHARMACIST"),
      StockController.updateStockById.bind(StockController)
    );

    this.router.put(
      "/stock/:id",
      authentication("ADMIN", "PHARMACIST"),
      StockController.updateStockById.bind(StockController)
    );

    this.router.delete(
      "/stock/:id",
      authentication("ADMIN"),
      StockController.deleteStockById.bind(StockController)
    );
  }
}

export default new StockRoutes().router;
