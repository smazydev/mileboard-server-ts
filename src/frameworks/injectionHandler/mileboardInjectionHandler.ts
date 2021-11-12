const Repository = require("../../frameworks/repositories/MongoDB/mileboardRepository");
const Service = require("../../Services/spreadsheet/MongoDB/MileboardService");

class MileboardServiceSingleton {
  private static mileboardService: MileboardServiceSingleton;

  private constructor() {}

  public static getInstance(): MileboardServiceSingleton {
    if (!MileboardServiceSingleton.mileboardService) {
      const mileboardRepository = new Repository.MileboardRepository();
      MileboardServiceSingleton.mileboardService =
        new Service.MileboardService(mileboardRepository);
    }

    return MileboardServiceSingleton.mileboardService;
  }
}

module.exports = { MileboardServiceSingleton };
export {};
