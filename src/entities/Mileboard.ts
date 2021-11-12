interface IMileboard {
  mileboardID: string;
  mileboardData: object;
}

class Mileboard {
  public mileboardID;
  public mileboardData;
  public readOnlyMileboard: string;

  constructor({ mileboardID }) {
    this.mileboardID = mileboardID;
    this.mileboardData = [];
    this.readOnlyMileboard = `r.${mileboardID}`;
  }
}

module.exports = { Mileboard };
export {};
