"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const employeeAuthController_1 = require("../controllers/employeeAuthController");
const mainMenuController_1 = require("../controllers/mainMenuController");
////////// ******* Online Menu ******* //////////
//// Get all menus for the online menu (no security required)
router.route("/get-all-main-menu-data").get(mainMenuController_1.getAllMainMenuData);
////////// ******* Menu Interface Form ******* //////////
router
    .route("/get-all-main-menu-data-interface")
    .get((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.getAllMainMenuData);
//// Main Menu Settings Controllers
/* router.route("/create-main-menu-settings").post(createMainMenuSettings); //// Only needed for initial creation of main menu settings */
router
    .route("/update-main-menu-settings")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.updateMainMenuSettings);
//// Starters Controllers
router
    .route("/create-starters-item")
    .post((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.createMainMenuStarters);
router
    .route("/update-starters-item")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.updateMainMenuStartersItem);
router
    .route("/delete-starters-item/:id")
    .delete((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.deleteMainMenuStartersItem);
//// Intermediate Controllers
router
    .route("/create-intermediate-item")
    .post((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.createMainMenuIntermediate);
router
    .route("/update-intermediate-item")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.updateMainMenuIntermediateItem);
router
    .route("/delete-intermediate-item/:id")
    .delete((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.deleteMainMenuIntermediateItem);
//// Mains Controllers
router
    .route("/create-mains-item")
    .post((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.createMainMenuMains);
router
    .route("/update-mains-item")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.updateMainMenuMainsItem);
router
    .route("/delete-mains-item/:id")
    .delete((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.deleteMainMenuMainsItem);
//// Desserts Controllers
router
    .route("/create-desserts-item")
    .post((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.createMainMenuDesserts);
router
    .route("/update-desserts-item")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.updateMainMenuDessertsItem);
router
    .route("/delete-desserts-item/:id")
    .delete((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), mainMenuController_1.deleteMainMenuDessertsItem);
exports.default = router;
