import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/app/shared/dto/pagination.dto';
import { PaginationResponseDto } from 'src/app/shared/dto/paginationReponseDto';
import { DatabaseError } from 'src/app/shared/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    name?: string,
    profileId?: string,
  ): Promise<PaginationResponseDto<UserEntity>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<UserEntity> = {};

    if (name) {
      where.name = name;
    }

    if (profileId) {
      where.profile = { id: profileId };
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['profile'],
      select: {
        id: true,
        login: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          id: true,
          name: true,
        },
      },
    });

    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages, currentPage: page };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['profile'],
    });

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      login: user.login,
      name: user.name,
      profile: { id: user.profile.id, name: user.profile.name },
    };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        login: createUserDto.login,
        name: createUserDto.name,
        passwordHash: passwordHash,
        profile: { id: createUserDto.profileId },
      });

      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return {
        login: newUser.login,
        name: newUser.name,
        profile: newUser.profile,
        id: newUser.id,
      };
    } catch (error) {
      const dbError = error as DatabaseError;
      if (dbError.code === '23505') {
        throw new ConflictException('Usuario já existe');
      }

      if (dbError.code === '23503') {
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      throw new Error('Erro ao criar usuario: ' + dbError.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = {
        login: updateUserDto?.login,
        name: updateUserDto?.name,
        profile: { id: updateUserDto.profileId },
      };

      const user = await this.userRepository.preload({
        id: id,
        ...updateUser,
      });

      if (!user) {
        throw new NotFoundException('Usuario não encontrado');
      }

      await this.userRepository.save(user);

      return {
        login: user.login,
        name: user.name,
        profile: user.profile,
      };
    } catch (error) {
      const dbError = error as DatabaseError;
      if (dbError.code === '23505') {
        throw new ConflictException('Login ja existente');
      }

      if (dbError.code === '23503') {
        throw new NotFoundException('O perfil informado não foi encontrado.');
      }

      throw new Error('Erro ao atualizar usuario: ' + dbError.message);
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    await this.userRepository.remove(user);

    return {
      login: user.login,
      name: user.name,
      profile: user.profile,
    };
  }
}
