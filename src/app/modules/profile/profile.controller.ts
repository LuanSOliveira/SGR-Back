import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Criar perfil' })
  @ApiResponse({
    status: 201,
    description: 'Perfil criado com sucesso',
  })
  @ApiResponse({ status: 409, description: 'Perfil já existe' })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar perfis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de perfis retornada com sucesso',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar perfil por ID' })
  @ApiResponse({
    status: 200,
    description: 'Perfil retornado com sucesso',
    type: ProfileResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar perfil' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado' })
  @ApiResponse({ status: 409, description: 'Perfil já existe' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover perfil' })
  @ApiResponse({ status: 200, description: 'Perfil removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado' })
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
