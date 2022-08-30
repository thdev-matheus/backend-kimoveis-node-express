import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { scheduleCreateService } from "../../services/schedules/scheduleCreate.service";

export const scheduleCreateController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { date, hour, propertyId } = req.body;

  if (!date || !hour || !propertyId) {
    throw new AppError(
      "the following fields are required: hour, date and propertyId",
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
