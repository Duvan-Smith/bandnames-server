const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band("Rata blanca"),
      new Band("Detras delultimo nova nadie"),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter((b) => b.id !== id);
  }

  getBand(id) {
    this.bands = this.bands.filter((b) => b.id === id);
    return this.bands;
  }

  getBands() {
    return this.bands;
  }

  incrementVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
      }
      return band;
    });
    return this.bands;
  }

  changeName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
    return this.bands;
  }
}

module.exports = BandList;
