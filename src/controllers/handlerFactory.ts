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

export const factoryGetOne = (model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.findById(req.params.id);

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

    if (!document)
      return new AppError("No document with this ID could be found", 404);

    res.status(404).json({
      status: "success",
      message: "Document removed successfully",
    });
  });
