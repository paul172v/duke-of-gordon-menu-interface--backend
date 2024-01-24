"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMainMenuDessertsItem = exports.updateMainMenuDessertsItem = exports.getMainMenuDesserts = exports.createMainMenuDesserts = exports.deleteMainMenuMainsItem = exports.updateMainMenuMainsItem = exports.getMainMenuMains = exports.createMainMenuMains = exports.deleteMainMenuIntermediateItem = exports.updateMainMenuIntermediateItem = exports.getMainMenuIntermediate = exports.createMainMenuIntermediate = exports.deleteMainMenuStartersItem = exports.updateMainMenuStartersItem = exports.getMainMenuStarters = exports.createMainMenuStarters = exports.updateMainMenuSettings = exports.createMainMenuSettings = exports.getAllMainMenuData = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const mainMenuDessertsModel_1 = __importDefault(require("../models/main-menu/mainMenuDessertsModel"));
const mainMenuSettingsModel_1 = __importDefault(require("../models/main-menu/mainMenuSettingsModel"));
const mainMenuIntermediateModel_1 = __importDefault(require("../models/main-menu/mainMenuIntermediateModel"));
const mainMenuMainsModel_1 = __importDefault(require("../models/main-menu/mainMenuMainsModel"));
const mainMenuStartersModel_1 = __importDefault(require("../models/main-menu/mainMenuStartersModel"));
const handlerFactory_1 = require("./handlerFactory");
//// General Controllers
exports.getAllMainMenuData = (0, catchAsync_1.default)(async (req, res, next) => {
    const mainMenuSettings = await mainMenuSettingsModel_1.default.find();
    const mainMenuStarters = await mainMenuStartersModel_1.default.find();
    const mainMenuIntermediate = await mainMenuIntermediateModel_1.default.find();
    const mainMenuMains = await mainMenuMainsModel_1.default.find();
    const mainMenuDesserts = await mainMenuDessertsModel_1.default.find();
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
});
//// Main Menu Settings
exports.createMainMenuSettings = (0, catchAsync_1.default)(async (req, res, next) => {
    const menuSettings = await mainMenuSettingsModel_1.default.create({
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
});
exports.updateMainMenuSettings = (0, catchAsync_1.default)(async (req, res, next) => {
    const menuSettings = await mainMenuSettingsModel_1.default.findByIdAndUpdate("6599aedec427250b84f5ecdc", {
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
});
///// Starters
exports.createMainMenuStarters = (0, handlerFactory_1.factoryCreateMenuItem)(mainMenuStartersModel_1.default);
exports.getMainMenuStarters = (0, handlerFactory_1.factoryGetAll)(mainMenuStartersModel_1.default);
exports.updateMainMenuStartersItem = (0, handlerFactory_1.factoryUpdateOneMenuItem)(mainMenuStartersModel_1.default);
exports.deleteMainMenuStartersItem = (0, handlerFactory_1.factoryDeleteOne)(mainMenuStartersModel_1.default);
///// Intermediate
exports.createMainMenuIntermediate = (0, handlerFactory_1.factoryCreateMenuItem)(mainMenuIntermediateModel_1.default);
exports.getMainMenuIntermediate = (0, handlerFactory_1.factoryGetAll)(mainMenuIntermediateModel_1.default);
exports.updateMainMenuIntermediateItem = (0, handlerFactory_1.factoryUpdateOneMenuItem)(mainMenuIntermediateModel_1.default);
exports.deleteMainMenuIntermediateItem = (0, handlerFactory_1.factoryDeleteOne)(mainMenuIntermediateModel_1.default);
///// Mains
exports.createMainMenuMains = (0, handlerFactory_1.factoryCreateMenuItem)(mainMenuMainsModel_1.default);
exports.getMainMenuMains = (0, handlerFactory_1.factoryGetAll)(mainMenuMainsModel_1.default);
exports.updateMainMenuMainsItem = (0, handlerFactory_1.factoryUpdateOneMenuItem)(mainMenuMainsModel_1.default);
exports.deleteMainMenuMainsItem = (0, handlerFactory_1.factoryDeleteOne)(mainMenuMainsModel_1.default);
///// Desserts
exports.createMainMenuDesserts = (0, handlerFactory_1.factoryCreateMenuItem)(mainMenuDessertsModel_1.default);
exports.getMainMenuDesserts = (0, handlerFactory_1.factoryGetAll)(mainMenuDessertsModel_1.default);
exports.updateMainMenuDessertsItem = (0, handlerFactory_1.factoryUpdateOneMenuItem)(mainMenuDessertsModel_1.default);
exports.deleteMainMenuDessertsItem = (0, handlerFactory_1.factoryDeleteOne)(mainMenuDessertsModel_1.default);
