const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      socket.emit("current-bands", this.bandList.getBands());

      socket.on("votar-banda", (id) => {
        this.bandList.incrementVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("borrar-banda", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("cambiar-nombre-banda", ({ id, nombre }) => {
        this.bandList.changeName(id, nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("nueva-banda", ({ nombre }) => {
        this.bandList.addBand(nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      // Ejemplo foro
      // socket.on("mensaje-to-server", (data) => {
      //   this.io.emit("mensaje-from-server", data);
      // });
      // Ejemplos
      // socket.on("mensaje-cliente", (data) => {
      //   console.log(data);
      // });
      // socket.emit("mensaje-bienvenida", {
      //   msg: "Bienvenido",
      //   fecha: new Date(),
      // });
    });
  }
}

module.exports = Sockets;
