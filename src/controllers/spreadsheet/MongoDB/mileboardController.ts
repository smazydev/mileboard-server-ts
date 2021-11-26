import { Request, Response } from "express";
const express = require("express");
const injectionHandler = require("../../../frameworks/injectionHandler/mileboardInjectionHandler");
const { Mileboard } = require("../../../entities/Mileboard");

const router = express.Router();

router.get("/boards/get-all", async (req: Request, res: Response) => {
  const mileboardService =
    injectionHandler.MileboardServiceSingleton.getInstance();
  const mileboards = await mileboardService.getAllMileboards();
  res.send(mileboards);
});

router.get("/boards/:id", async (req: Request, res: Response) => {
  const mileboardService =
    injectionHandler.MileboardServiceSingleton.getInstance();
  const mileboardData = await mileboardService.findMileboardByID(
    req.params.id
  );
  res.send(mileboardData);
});

router.post("/boards/delete", async (req: Request, res: Response) => {
  const mileboardService =
    injectionHandler.MileboardServiceSingleton.getInstance();
  const { mileboardID } = req.body;
  console.log(mileboardID);
  const mileboard = await mileboardService.deleteMileboard(
    mileboardID
  );
  res.send({});
});

router.post("/boards/update", async (req: Request, res: Response) => {
  const mileboardService =
    injectionHandler.MileboardServiceSingleton.getInstance();
  const { mileboardID, mileboardData } = req.body;
  console.log(mileboardID);
  const response = await mileboardService.updateMileboard(
    mileboardID,
    mileboardData
  );
  res.send(response);
});

router.post("/boards/create", async (req: Request, res: Response) => {
  const mileboardService =
    injectionHandler.MileboardServiceSingleton.getInstance();
  const { id } = req.body;
  console.log("Create",id);
  const newMileboard = new Mileboard({
    mileboardID: id,
  });

  const getData = await mileboardService.findMileboardByID(id);

  if (!(getData === undefined || getData.length === 0)) {
    if (getData[0].mileboardID === id) {
      res.status(200).send(getData);
    }
  } else {
    try {
      const addedMileboard = await mileboardService.addMileboard(
        newMileboard
      );
      res.status(200).send(`New Mileboard created! ${addedMileboard}`);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
