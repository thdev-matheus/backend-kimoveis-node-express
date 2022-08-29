import { Request, Response } from "express";
import { propertyListAllService } from "../../services/properties/propertyListAll.service";

export const propertyListAllController = async (
  req: Request,
  res: Response
) => {
  const properties = await propertyListAllService();

  return res.status(200).json(properties);
};
