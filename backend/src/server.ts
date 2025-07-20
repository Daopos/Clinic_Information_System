import express from "express";

class server {
  public app: express.Application;

  constructor() {
    this.app = express();

    //initialize functions
    this.serve();
  }

  private serve(): void {
    const PORT: number = 3000;

    this.app.listen(PORT, () => console.log("sasdasd"));
  }
}

export default new server().app;
