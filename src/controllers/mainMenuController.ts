import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import MainMenuDesserts from "../models/main-menu/mainMenuDessertsModel";
import MainMenuSettings from "../models/main-menu/mainMenuSettingsModel";
import MainMenuIntermediate from "../models/main-menu/mainMenuIntermediateModel";
import MainMenuMains from "../models/main-menu/mainMenuMainsModel";
import MainMenuStarters from "../models/main-menu/mainMenuStartersModel";
import {
  factoryCreateMenuItem,
  factoryGetAll,
  factoryUpdateOneMenuItem,
  factoryDeleteOne,
} from "./handlerFactory";

//// General Controllers
export const getAllMainMenuData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const mainMenuSettings = await MainMenuSettings.find();
    const mainMenuStarters = await MainMenuStarters.find();
    const mainMenuIntermediate = await MainMenuIntermediate.find();
    const mainMenuMains = await MainMenuMains.find();
    const mainMenuDesserts = await MainMenuDesserts.find();

    res.status(200).json({
      status: "success",
      payload: {
        mainMenuSettings,
        mainMenuStarters,
        mainMenuIntermediate,
        mainMenuMains,
        mainMenuDesserts,
      },
    });
  }
);

//// Main Menu Settings
export const createMainMenuSettings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const menuSettings = await MainMenuSettings.create({
      menuActive: req.body.menuActive,
      date: req.body.date,
      showStarters: req.body.showStarters,
      showIntermediate: req.body.showIntermediate,
      showMains: req.body.showMains,
      showDesserts: req.body.showDesserts,
      showPrices: req.body.showPrices,
      startersPrice: req.body.starterPrice,
      intermediatePrice: req.body.intermediatePrice,
      mainsPrice: req.body.mainsPrice,
      dessertsPrice: req.body.dessertsPrice,
    });

    res.status(200).json({
      status: "success",
      message: "Menu settings have been created successfully",
      payload: {
        menuSettings,
      },
    });
  }
);

export const updateMainMenuSettings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const menuSettings = await MainMenuSettings.findByIdAndUpdate(
      "6599aedec427250b84f5ecdc",
      {
        menuActive: req.body.menuActive,
        date: req.body.date,
        showStarters: req.body.showStarters,
        showIntermediate: req.body.showIntermediate,
        showMains: req.body.showMains,
        showDesserts: req.body.showDesserts,
        showPrices: req.body.showPrices,
        startersPrice: req.body.starterPrice,
        intermediatePrice: req.body.intermediatePrice,
        mainsPrice: req.body.mainsPrice,
        dessertsPrice: req.body.dessertsPrice,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Menu settings have been created successfully",
      payload: {
        menuSettings,
      },
    });
  }
);

///// Starters
export const createMainMenuStarters = factoryCreateMenuItem(MainMenuStarters);
export const getMainMenuStarters = factoryGetAll(MainMenuStarters);
export const updateMainMenuStartersItem =
  factoryUpdateOneMenuItem(MainMenuStarters);
export const deleteMainMenuStartersItem = factoryDeleteOne(MainMenuStarters);

///// Intermediate
export const createMainMenuIntermediate =
  factoryCreateMenuItem(MainMenuIntermediate);
export const getMainMenuIntermediate = factoryGetAll(MainMenuIntermediate);
export const updateMainMenuIntermediateItem =
  factoryUpdateOneMenuItem(MainMenuIntermediate);
export const deleteMainMenuIntermediateItem =
  factoryDeleteOne(MainMenuIntermediate);

///// Mains
export const createMainMenuMains = factoryCreateMenuItem(MainMenuMains);
export const getMainMenuMains = factoryGetAll(MainMenuMains);
export const updateMainMenuMainsItem = factoryUpdateOneMenuItem(MainMenuMains);
export const deleteMainMenuMainsItem = factoryDeleteOne(MainMenuMains);

///// Desserts
export const createMainMenuDesserts = factoryCreateMenuItem(MainMenuDesserts);
export const getMainMenuDesserts = factoryGetAll(MainMenuDesserts);
export const updateMainMenuDessertsItem =
  factoryUpdateOneMenuItem(MainMenuDesserts);
export const deleteMainMenuDessertsItem = factoryDeleteOne(MainMenuDesserts);
