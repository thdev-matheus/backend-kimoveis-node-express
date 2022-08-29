import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";

export const propertyListAllService = async () => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const properties = await propertyRepository.find();

  return properties;
};
