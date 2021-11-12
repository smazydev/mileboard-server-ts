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
    // if (spreadsheetData.length === 0) {
    //   return "no data received"
    // }

    if (mileboardData.length === 0) {
      return "no data received";
    }

    const document = await MileboardModel.find({ spreadsheetID: id });

    const mileboardDataArr = document[0].mileboardData;

    //IF THERE IS NO DATA IN ARRAY JUST PUSH IT IN
    if (mileboardDataArr.length === 0) {
      mileboardDataArr.push(mileboardData);
      document[0].save();
      console.log(mileboardDataArr.length);
      return "written";
    } else {
    
      const index = mileboardDataArr.findIndex((item) => {
        return item.name === mileboardData.name;
      });

      mileboardDataArr[index] = mileboardData;

      if (index === -1) {
        mileboardDataArr.push(mileboardData);
      }

      console.log(index);

      document[0].save();
    }
  };
}

module.exports = { MileboardRepository };
export {};
