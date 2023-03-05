import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({example: 'Товары для дома', description: 'Название категории'})
    title: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {

    @ApiProperty({example: 2, description: 'Id категории'})
    id: number;
}
