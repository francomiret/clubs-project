import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService) { }

    @Post()
    @Roles('ADMIN', 'MANAGER')
    create(@Body() createPropertyDto: CreatePropertyDto, @CurrentUser() user: UserEntity) {
        return this.propertiesService.create(createPropertyDto);
    }

    @Get()
    findAll(@Query('clubId') clubId?: string) {
        return this.propertiesService.findAll(clubId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.propertiesService.findOne(id);
    }

    @Patch(':id')
    @Roles('ADMIN', 'MANAGER')
    update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
        return this.propertiesService.update(id, updatePropertyDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.propertiesService.remove(id);
    }
}
