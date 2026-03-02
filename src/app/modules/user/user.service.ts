import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {  Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/app/shared/dto/pagination.dto';
import { PaginationResponseDto } from 'src/app/shared/dto/paginationReponseDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    name?: string,
    profile?: string,
  ): Promise<PaginationResponseDto<UserEntity>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (name) {
      where.name = name;
    }
    if (profile) {
      where.profile = profile;
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      select: {
        login: true,
        name: true,
        profile: true,
        id: true,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages, currentPage: page };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })

    if(!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)
    }

     return {
        id: user.id,
        login: user.login,
        name: user.name,
        profile: user.profile,

    }  
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);

      const user = {
        login: createUserDto.login,
        name: createUserDto.name,
        profile: createUserDto.profile,
        passwordHash: passwordHash,
      };

      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return {
        login: newUser.login,
        name: newUser.name,
        profile: newUser.profile,
        id: newUser.id,
      }

    } catch (error) { 
      if(error.code === '23505'){
        throw new ConflictException('Usuario já existe');
      }

      throw new Error('Erro ao criar usuario: ' + error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const updateUser = {
        login: updateUserDto?.login,
        name: updateUserDto?.name,
        profile: updateUserDto?.profile,
      }

      const user = await this.userRepository.preload({
        id: id,
        ...updateUser,
      })

      if(!user){
        throw new NotFoundException('Usuario não encontrado');
      }

      await this.userRepository.save(user);

      return {
        login: user.login,
        name: user.name,
        profile: user.profile,

      }  
    }catch(error){
      if(error.code === '23505'){
        throw new ConflictException('Login ja existente');
      }

      throw new Error('Erro ao atualizar usuario: ' + error.message);
    }
      
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(!user){
      throw new NotFoundException('Usuario não encontrado');
    }

    await this.userRepository.remove(user);

    return {
        login: user.login,
        name: user.name,
        profile: user.profile,

      }  
  }
}
