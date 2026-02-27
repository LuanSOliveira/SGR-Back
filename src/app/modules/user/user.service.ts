import { Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);

      const user = {
        name: createUserDto.name,
        profile: createUserDto.profile,
        passwordHash: passwordHash,
      };

      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Erro ao criar usuario: ' + error.message);
    }
  }

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
        name: true,
        profile: true,
        id: true,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages, currentPage: page };
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
