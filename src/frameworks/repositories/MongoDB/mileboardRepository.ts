import e from "express";

const Mileboard = require("../../../entities/Mileboard");
const {
  MileboardModel,
} = require("../../database/mongoDB/models/MileboardSchema");

interface IMileboardRepository {
  add(mileboard: typeof Mileboard.Mileboard): void;
  delete(mileboardID: string): void;
  findByID(mileboardID: string): void;
}

class MileboardRepository implements IMileboardRepository {
  /**
   * @param mileboard {object} is the mileboard that you want to add. It should have the following properties.
   * mileboardID:string, spreadsheetData: object. It'll save it to the database.
   */
  add = (mileboard: typeof Mileboard.Mileboard) => {
    const newMileboard = new MileboardModel(mileboard);
    console.log("creating new spreadsheet", newMileboard);
    return newMileboard.save();
  };

  /**
   * @param mileboard {object} is the mileboard that you want to delete. It should satisfy the properties of IMileboard.
   * It returns the deleted Mileboard object.
   */
  delete = (id: string) => {
    MileboardModel.deleteOne({ mileboardID: id })
      .then(() => {
        console.log("Data deleted");
      })
      .catch((err) => {
        console.log(err);
      });
    return {};
  };

  /**
   *
   * @param id {string} is the id of the mileboard that you want to find. It returns the mileboard Object that holds the data.
   */
  findByID = (id: string) => {
    return MileboardModel.find({ mileboardID: id });
  };

  /**
   * Get all Mileboards
   */
  getAll = () => {
    return MileboardModel.find({});
  };

  update = async (id, mileboardData) => {
    if (!mileboardData) {
      return "no data received";
    } 
    try {
      const document = await MileboardModel.findOne({ mileboardID: id });
      document.mileboardData[0] = mileboardData;
      document.save();
      console.log("data written");
    } catch(e) {
      console.log(e);
      console.log("data not written");
    }
  }
}

module.exports = { MileboardRepository };
export {};
