import { TypeOrmEntity } from 'src/app/shared/entities/typeorm.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends TypeOrmEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar' })
  profile: string;
}
