import { TypeOrmEntity } from 'src/app/shared/entities/typeorm.entity';
import { Column, Entity } from 'typeorm';

export enum UserProfile {
  admin = 'Admin',
  garçom = 'Garçom',
  caixa = 'Caixa',
  gerente = 'Gerente'
}

@Entity('user')
export class UserEntity extends TypeOrmEntity {
  @Column({ unique: true, type: 'varchar', length: 255, nullable: false})
  login: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false})
  passwordHash: string;

  @Column({type: 'varchar', length: 100, nullable: false})
  name: string;

  @Column({ type: 'enum',enum: UserProfile, default: UserProfile.garçom, nullable: false})
  profile: string;
}
