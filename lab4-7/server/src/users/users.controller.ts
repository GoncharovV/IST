import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({summary: 'Добавить пользователя'})
    @ApiResponse({status: 201, type: String})
    @Post()
    @HttpCode(201)
    public async create(
        @Body() userDto: CreateUserDto
    ) {
        await this.usersService.createUser(userDto);
        return 'created';
    }

    @ApiOperation({summary: 'Получить список всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    public async getAll() {
        return this.usersService.getAll();
    }

    @ApiOperation({summary: 'Получить список всех пользователей'})
    @ApiResponse({status: 200, type: User})
    @Delete(':id')
    public async delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
