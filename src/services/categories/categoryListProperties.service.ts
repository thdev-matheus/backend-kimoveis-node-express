import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError.model";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";

export const categoryListPropertiesService = async (categoryId: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categoryWithProperties = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: { properties: true },
  });

  if (!categoryWithProperties) {
    throw new AppError("Category not found", 404, "https://http.cat/404");
  }

  return categoryWithProperties;
};
