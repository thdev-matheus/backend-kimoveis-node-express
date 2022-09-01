import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { scheduleCreateService } from "../../services/schedules/scheduleCreate.service";

export const scheduleCreateController = async (req: Request, res: Response) => {
  const { date, hour, propertyId, userId } = req.body;

  if (!date || !hour || !propertyId || !userId) {
    throw new AppError(
      "the following fields are required: hour, date, propertyId, userId",
      400,
      "https://http.cat/400"
    );
  }

  const newSchedule = await scheduleCreateService({
    date,
    hour,
    propertyId,
    userId,
  });

  return res
    .status(201)
    .json({ message: "schedule successfuly created", schedule: newSchedule });
};
