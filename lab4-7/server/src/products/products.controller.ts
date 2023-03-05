import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './DTO/create-product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '../categories/category.model';
import { Product } from './prodcut.model';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ) {
    }

    @ApiOperation({summary: 'Создать товар'})
    @ApiResponse({status: 201, type: Product})
    @Post()
    public createProduct(
        @Body() dto: CreateProductDto,
    ) {
        return this.productsService.create(dto);
    }

    @ApiOperation({summary: 'Получить все товары'})
    @ApiResponse({status: 200, type: [Product]})
    @Get()
    public getAll() {
        return this.productsService.getAll();
    }

    @ApiOperation({summary: 'Изменить товар'})
    @ApiResponse({status: 200, type: Product})
    @Put()
    public update(@Body() dto: UpdateProductDto,) {
        return this.productsService.update(dto)
    }

    @ApiOperation({summary: 'Удалить товар'})
    @ApiResponse({status: 200})
    @Delete(':id')
    public delete(@Param('id') id: string) {
        return this.productsService.delete(+id)

    }

}