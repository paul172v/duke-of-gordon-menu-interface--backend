import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const factoryGetAll = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const documents = await model.find();

    if (!documents)
      return new AppError("No documents of this type could be found", 404);

    res.status(200).json({
      status: "success",
      results: documents.length,
      payload: documents,
    });
  });

export const factoryGetOneById = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.findById(req.params.id);

    if (!document)
      return new AppError("No document with this ID could be found", 404);

    res.status(200).json({
      status: "success",
      payload: document,
    });
  });

export const factoryGetOneByEmail = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.find({ email: req.body.email });

    if (!document)
      return new AppError("No document with this ID could be found", 404);

    res.status(200).json({
      status: "success",
      payload: document,
    });
  });

export const factoryUpdateOne = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const updatedDocument = await model.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!updatedDocument)
      return new AppError("No document with this ID could be found", 404);

    res.status(201).json({
      status: "success",
      message: "Document updated successfully",
      payload: updatedDocument,
    });
  });

export const factoryDeleteOne = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.findByIdAndDelete(req.params.id);

    if (!document) {
      return new AppError("No document with this ID could be found", 404);
    }

    const updatedMenu = await model.find();

    res.status(404).json({
      status: "success",
      message: "Document removed successfully",
      payload: updatedMenu,
    });
  });

export const factoryCreateMenuItem = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    let body = {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.dietary && { dietary: req.body.dietary }),
      ...(req.body.description
        ? { description: req.body.description }
        : { description: null }),
    };

    if (req.body.description && req.body.description.length > 241)
      return new AppError("Description can only be 241 character long", 400);

    await model.create(body);

    const updatedMenu = await model.find();

    res.status(200).json({
      status: "success",
      message: "Document created successfully",
      payload: updatedMenu,
    });
  });

export const factoryUpdateOneMenuItem = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    let updateFields = {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.dietary && { dietary: req.body.dietary }),
      ...(req.body.description
        ? { description: req.body.description }
        : { description: null }),
    };

    if (req.body.description && req.body.description.length > 241) {
      new AppError("Description can only be 241 characters long", 400);
      return res.status(400).json({
        status: "fail",
        message: "Description can only be 241 characters long",
      });
    }

    const updatedItem = await model.findByIdAndUpdate(
      req.body.id,
      updateFields
    );

    updatedItem?.save();

    const updatedMenu = await model.find();

    res.status(200).json({
      status: "success",
      message: "Item updated successfully",
      payload: updatedMenu,
    });
  });
