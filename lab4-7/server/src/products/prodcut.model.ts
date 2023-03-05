import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Category } from '../categories/category.model';
import { ApiProperty } from '@nestjs/swagger';

interface ProductCreationAttrs {
    title: string;
    description: string;
    userId: number;
    categoryId: number;
    image: string;
}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttrs> {
    @ApiProperty({example: 1, description: 'Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Самовар', description: 'Название товара'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: '1000 л.с.', description: 'Описание товара'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({example: 'yandex.ru', description: 'Ссылка на изображение товара'})
    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    creator: User;

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    categoryId: number;

}
