import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Category } from './category.model';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @ApiOperation({summary: 'Создать категорию'})
    @ApiResponse({status: 201, type: Category})
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @ApiOperation({summary: 'Получить список всех категорий'})
    @ApiResponse({status: 200, type: [Category]})
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @ApiOperation({summary: 'Изменить категорию'})
    @ApiResponse({status: 200, type: Category})
    @Put()
    update(@Body() updateCategoryDto: any) {
        return this.categoriesService.update(updateCategoryDto);
    }

    @ApiOperation({summary: 'Удалить категорию'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
}
