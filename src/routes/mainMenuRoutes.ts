import express from "express";

const router = express.Router();

import { employeeProtectAndRestrictTo } from "../controllers/employeeAuthController";
import {} from "../controllers/employeeController";
import {
  getAllMainMenuData,
  // createMainMenuSettings,
  updateMainMenuSettings,
  createMainMenuStarters,
  updateMainMenuStartersItem,
  deleteMainMenuStartersItem,
  createMainMenuIntermediate,
  updateMainMenuIntermediateItem,
  deleteMainMenuIntermediateItem,
  createMainMenuMains,
  updateMainMenuMainsItem,
  deleteMainMenuMainsItem,
  createMainMenuDesserts,
  updateMainMenuDessertsItem,
  deleteMainMenuDessertsItem,
} from "../controllers/mainMenuController";

//// Get the settings, starters, intermediate, mains and desserts lists from the database
router.route("/get-all-main-menu-data").get(getAllMainMenuData);

//// Main Menu Settings Controllers

/* router.route("/create-main-menu-settings").post(createMainMenuSettings); //// Only needed for initial creation of main menu settings */

router
  .route("/update-main-menu-settings")
  .patch(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    updateMainMenuSettings
  );

//// Starters Controllers
router
  .route("/create-starters-item")
  .post(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    createMainMenuStarters
  );
router
  .route("/update-starters-item")
  .patch(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    updateMainMenuStartersItem
  );

router
  .route("/delete-starters-item/:id")
  .delete(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    deleteMainMenuStartersItem
  );

//// Intermediate Controllers
router
  .route("/create-intermediate-item")
  .post(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    createMainMenuIntermediate
  );
router
  .route("/update-intermediate-item")
  .patch(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    updateMainMenuIntermediateItem
  );

router
  .route("/delete-intermediate-item/:id")
  .delete(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    deleteMainMenuIntermediateItem
  );

//// Mains Controllers
router
  .route("/create-mains-item")
  .post(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    createMainMenuMains
  );
router
  .route("/update-mains-item")
  .patch(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    updateMainMenuMainsItem
  );

router
  .route("/delete-mains-item/:id")
  .delete(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    deleteMainMenuMainsItem
  );

//// Desserts Controllers
router
  .route("/create-desserts-item")
  .post(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    createMainMenuDesserts
  );
router
  .route("/update-desserts-item")
  .patch(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    updateMainMenuDessertsItem
  );

router
  .route("/delete-desserts-item/:id")
  .delete(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    deleteMainMenuDessertsItem
  );

export default router;
