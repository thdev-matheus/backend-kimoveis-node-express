import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError.model";
import { ICategoryRequest } from "../../interfaces/categories";

export const categoryCreateService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categoryAlreadyExists = await categoryRepository.findOne({
    where: { name },
  });

  if (categoryAlreadyExists) {
    throw new AppError("Category already exists", 400, "https://http.cat/400");
  }

  const newCategory = categoryRepository.create({
    name,
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};
