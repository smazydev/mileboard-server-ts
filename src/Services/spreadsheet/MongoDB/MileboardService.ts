const { Mileboard } = require("../../../entities/Mileboard");

class MileboardService {
  mileboardRepository;

  constructor(mileboardRepository) {
    this.mileboardRepository = mileboardRepository;
  }

  addMileboard = (mileboard: typeof Mileboard) => {
    return this.mileboardRepository.add(mileboard);
  };

  deleteMileboard = (id: string) => {
    return this.mileboardRepository.delete(id);
  };

  findMileboardByID = (id: string) => {
    return this.mileboardRepository.findByID(id);
  };

  getAllMileboards = () => {
    return this.mileboardRepository.getAll();
  };

  updateMileboard = (mileboardID, mileboardData) => {
    return this.mileboardRepository.update(mileboardID, mileboardData);
  };
}

module.exports = {
  MileboardService,
};
export {};
