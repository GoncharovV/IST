import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({example: 'Стул', description: 'Название'})
    readonly title: string;

    @ApiProperty({example: 'На нем можно сидеть', description: 'Описание товара'})
    readonly description: string;

    @ApiProperty({example: 1, description: 'Id пользователя, который владеет товаром'})
    readonly userId: number;

    @ApiProperty({example: 2, description: 'Id категории, к которой относится товар'})
    readonly categoryId: number;

    @ApiProperty({example: 'yandex.ru', description: 'Ссылка на изображние товара'})
    readonly image: string;

    @ApiProperty({example: 1200, description: 'Цена'})
    readonly price: number;
}


export class UpdateProductDto extends CreateProductDto {

    @ApiProperty({example: 2, description: 'Id товара'})
    id: number;
}
