import { TypeOrmEntity } from 'src/app/shared/entities/typeorm.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('profile')
export class ProfileEntity extends TypeOrmEntity {
  @Column({ unique: true, type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  path: string;

  @OneToMany(() => UserEntity, (user) => user.profile)
  users: UserEntity[];
}
