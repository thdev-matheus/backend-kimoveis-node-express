import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { ICategoryRequest } from "../../interfaces/categories";
import { categoryCreateService } from "../../services/categories/categoryCreate.service";

export const categoryCreatecontroller = async (req: Request, res: Response) => {
  const { name }: ICategoryRequest = req.body;

  if (!name) {
    throw new AppError(
      "The following fields are required: name: string",
      400,
      "https://http.cat/400"
    );
  }

  const newCategory = await categoryCreateService({ name });

  return res.status(201).json(newCategory);
};
