import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError.model";

export const scheduleListByPropertyService = async (propertyId: string) => {
  const propertiesRepository = AppDataSource.getRepository(Property);

  const property = await propertiesRepository.findOne({
    where: { id: propertyId },
    relations: { schedules: true },
  });

  if (!property) {
    throw new AppError("Property not found", 404, "https://http.cat/404");
  }

  return property;
};
