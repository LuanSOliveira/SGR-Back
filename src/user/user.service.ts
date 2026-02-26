import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {

    try{

      const passwordHash = await bcrypt.hash(createUserDto.password, 10);

      const user = {
        name: createUserDto.name,
        profile: createUserDto.profile,
        passwordHash: passwordHash,
      }

      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch(error){
      throw new Error('Erro ao criar usuario: ' + error.message);
    }

 }

  async findAll() {
    const users = await this.userRepository.find({  
      select: {name: true, profile: true,}
    });
    
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
