import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

export const categoryListAllService = async () => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();

  return categories;
};
