import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from '../products/prodcut.model';
import { ApiProperty } from '@nestjs/swagger';

interface CategoryCreationAttrs {
    title: string;
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttrs> {
    @ApiProperty({example: 2, description: 'Id категории'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Товары для дома', description: 'Название категории'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @HasMany(() => Product)
    products: Product[];
}
