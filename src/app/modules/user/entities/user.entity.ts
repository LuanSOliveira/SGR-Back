import { TypeOrmEntity } from 'src/app/shared/entities/typeorm.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('user')
export class UserEntity extends TypeOrmEntity {
  @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
  login: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: true })
  passwordHash: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ManyToOne(() => ProfileEntity, {
    nullable: false,
    onDelete: 'RESTRICT', // Impede deletar um perfil que tenha usuários vinculados
  })
  @JoinColumn({ name: 'profileId' }) // Cria a coluna profileId no banco
  profile: ProfileEntity;
}
