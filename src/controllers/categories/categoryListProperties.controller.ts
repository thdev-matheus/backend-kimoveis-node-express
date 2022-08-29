import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { categoryListPropertiesService } from "../../services/categories/categoryListProperties.service";

export const categoryListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new AppError("category id is missing", 400, "https://http.cat/400");
  }

  const categoryWithProperties = await categoryListPropertiesService(
    categoryId
  );

  return res.status(200).json(categoryWithProperties);
};
