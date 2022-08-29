import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError.model";
import { IPropertyRequest } from "../../interfaces/properties";

export const propertyCreateService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const propertyRepository = AppDataSource.getRepository(Property);
  const addressRepository = AppDataSource.getRepository(Address);

  const { district, zipCode, number, city, state } = address;

  if (state.length > 2 || zipCode.length > 8) {
    throw new AppError(
      "The state field cannot contain a size greater than 2 just as the zipCode field cannot contain a size greater than 8",
      400,
      "https://http.cat/400"
    );
  }

  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });
  const addressAlreadyInUse = await addressRepository.findOne({
    where: { district, zipCode, city, state, number },
  });

  if (!category) {
    throw new AppError("Category not found", 404, "https://http.cat/404");
  }

  if (addressAlreadyInUse) {
    throw new AppError(
      "The address is already in use",
      400,
      "https://http.cat/400"
    );
  }

  const newAddress = addressRepository.create({
    district,
    zipCode,
    city,
    state,
    number,
  });

  await addressRepository.save(newAddress);

  const newProperty = propertyRepository.create({
    value,
    size,
    address: newAddress,
    category,
  });

  await propertyRepository.save(newProperty);

  return newProperty;
};
