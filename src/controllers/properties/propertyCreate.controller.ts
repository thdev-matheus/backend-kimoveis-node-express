import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { IPropertyRequest } from "../../interfaces/properties";
import { propertyCreateService } from "../../services/properties/propertyCreate.service";

export const propertyCreateController = async (req: Request, res: Response) => {
  const { value, size, address, categoryId }: IPropertyRequest = req.body;

  if (!value || !size || !address || !categoryId) {
    throw new AppError(
      "The following fields are required: value, size, address, categoryId",
      400,
      "https://http.cat/400"
    );
  }

  const { district, zipCode, city, state } = address;

  if (!district || !zipCode || !city || !state) {
    throw new AppError(
      "The following fields are required in address field: district, zipCode, city, state",
      400,
      "https://http.cat/400"
    );
  }

  const newProperty = await propertyCreateService({
    value,
    size,
    address,
    categoryId,
  });

  return res.status(201).json(newProperty);
};
