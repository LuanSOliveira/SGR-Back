import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileEntity } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
})
export class ProfileModule {}
