import { Request, Response } from "express";
import { categoryListAllService } from "../../services/categories/categoryListAll.service";

export const categoryListAllController = async (
  req: Request,
  res: Response
) => {
  const categories = await categoryListAllService();

  return res.status(200).json(categories);
};
