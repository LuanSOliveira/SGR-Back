import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: string) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Perfil não encontrado`);
    }
    return profile;
  }

  async create(createProfileDto: CreateProfileDto) {
    try {
      const profile = this.profileRepository.create(createProfileDto);
      return await this.profileRepository.save(profile);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Perfil já existe.');
      }

      throw new Error('Erro ao criar o perfil.');
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      const profile = await this.profileRepository.preload({
        id: id,
        ...updateProfileDto,
      });

      if (!profile) {
        throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
      }

      return await this.profileRepository.save(profile);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Perfil já existe.');
      }

      throw new Error('Erro ao criar o perfil.');
    }
  }

  async remove(id: string) {
    try {
      const profile = await this.findOne(id);
      if (!profile) {
        throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
      }
      return await this.profileRepository.remove(profile);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Não foi possível remover o perfil.',
      );
    }
  }
}
