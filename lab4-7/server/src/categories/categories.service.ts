import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {

  constructor(
      @InjectModel(Category)
      private readonly categoriesRepository: typeof Category
  ) {
  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return category;
  }

  findAll() {
    return this.categoriesRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findByPk(updateCategoryDto.id)

    await category.update(updateCategoryDto);

    return category;
  }

  async remove(id: number) {
    const c = await this.categoriesRepository.findByPk(id)

    await c.destroy();
  }
}
