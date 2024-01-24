"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryUpdateOneMenuItem = exports.factoryCreateMenuItem = exports.factoryDeleteOne = exports.factoryUpdateOne = exports.factoryGetOneByEmail = exports.factoryGetOneById = exports.factoryGetAll = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const factoryGetAll = (model) => (0, catchAsync_1.default)(async (req, res) => {
    const documents = await model.find();
    if (!documents)
        return new appError_1.default("No documents of this type could be found", 404);
    res.status(200).json({
        status: "success",
        results: documents.length,
        payload: documents,
    });
});
exports.factoryGetAll = factoryGetAll;
const factoryGetOneById = (model) => (0, catchAsync_1.default)(async (req, res) => {
    const document = await model.findById(req.params.id);
    if (!document)
        return new appError_1.default("No document with this ID could be found", 404);
    res.status(200).json({
        status: "success",
        payload: document,
    });
});
exports.factoryGetOneById = factoryGetOneById;
const factoryGetOneByEmail = (model) => (0, catchAsync_1.default)(async (req, res) => {
    const document = await model.find({ email: req.body.email });
    if (!document)
        return new appError_1.default("No document with this ID could be found", 404);
    res.status(200).json({
        status: "success",
        payload: document,
    });
});
exports.factoryGetOneByEmail = factoryGetOneByEmail;
const factoryUpdateOne = (model) => (0, catchAsync_1.default)(async (req, res) => {
    const updatedDocument = await model.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedDocument)
        return new appError_1.default("No document with this ID could be found", 404);
    res.status(201).json({
        status: "success",
        message: "Document updated successfully",
        payload: updatedDocument,
    });
});
exports.factoryUpdateOne = factoryUpdateOne;
const factoryDeleteOne = (model) => (0, catchAsync_1.default)(async (req, res) => {
    const document = await model.findByIdAndDelete(req.params.id);
    if (!document) {
        return new appError_1.default("No document with this ID could be found", 404);
    }
    const updatedMenu = await model.find();
    res.status(404).json({
        status: "success",
        message: "Document removed successfully",
        payload: updatedMenu,
    });
});
exports.factoryDeleteOne = factoryDeleteOne;
const factoryCreateMenuItem = (model) => (0, catchAsync_1.default)(async (req, res) => {
    let body = {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.dietary && { dietary: req.body.dietary }),
        ...(req.body.description
            ? { description: req.body.description }
            : { description: null }),
    };
    if (req.body.description && req.body.description.length > 241)
        return new appError_1.default("Description can only be 241 character long", 400);
    await model.create(body);
    const updatedMenu = await model.find();
    res.status(200).json({
        status: "success",
        message: "Document created successfully",
        payload: updatedMenu,
    });
});
exports.factoryCreateMenuItem = factoryCreateMenuItem;
const factoryUpdateOneMenuItem = (model) => (0, catchAsync_1.default)(async (req, res) => {
    let updateFields = {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.dietary && { dietary: req.body.dietary }),
        ...(req.body.description
            ? { description: req.body.description }
            : { description: null }),
    };
    if (req.body.description && req.body.description.length > 241) {
        new appError_1.default("Description can only be 241 characters long", 400);
        return res.status(400).json({
            status: "fail",
            message: "Description can only be 241 characters long",
        });
    }
    const updatedItem = await model.findByIdAndUpdate(req.body.id, updateFields);
    updatedItem === null || updatedItem === void 0 ? void 0 : updatedItem.save();
    const updatedMenu = await model.find();
    res.status(200).json({
        status: "success",
        message: "Item updated successfully",
        payload: updatedMenu,
    });
});
exports.factoryUpdateOneMenuItem = factoryUpdateOneMenuItem;
