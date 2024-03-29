const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = "/api/users";

    //Middlewares
    this.middlewares();
    //Rutas del Server
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del Body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port", this.port);
    });
  }
}
module.exports = Server;
