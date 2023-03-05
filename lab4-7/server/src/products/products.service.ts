import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './DTO/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './prodcut.model';
import { User } from '../users/users.model';
import { Category } from '../categories/category.model';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {

    public constructor(
        @InjectModel(Product)
        private readonly productRepository: typeof Product,
    ) {
    }

    public async create(dto: CreateProductDto) {
        const product = await this.productRepository.create({
            ...dto,
        })

        return product;
    }

    public async getAll(minPrice = 0, maxPrice = Infinity) {
        return this.productRepository.findAll({
            include: { all: true }, where: {
                price: {
                    [Op.gte]: minPrice,
                    [Op.lte]: maxPrice,
                },
            }
        });
    }

    public async update(dto: UpdateProductDto) {
        const product = await this.productRepository.findByPk(dto.id)

        await product.update(dto);

        return product;
    }

    public async delete(id: number) {
        const product = await this.productRepository.findByPk(id)

        await product.destroy();
    }
}
