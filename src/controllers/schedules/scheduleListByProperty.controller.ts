import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { scheduleListByPropertyService } from "../../services/schedules/scheduleListByProperty.service";

export const scheduleListByPropertyController = async (
  req: Request,
  res: Response
) => {
  const { propertyId } = req.params;

  if (!propertyId) {
    throw new AppError(
      "Missing propertyId in params",
      400,
      "https://http.cat/400"
    );
  }

  const scheduleListByProperty = await scheduleListByPropertyService(
    propertyId
  );

  return res.status(200).json(scheduleListByProperty);
};
