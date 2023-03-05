import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/prodcut.model';

interface UserCreationAttrs {
    email: string;
    password: string;
    name: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '642', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'v@mail.ru', description: 'Почта'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'name', description: 'Имя'})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example: 'vadim-krutoi', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Product)
    products: Product[];
}
