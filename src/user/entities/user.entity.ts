import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type: "varchar", length: 50})
    name: string;

    @Column({type: "varchar", length: 255})
    passwordHash: string;

    @Column({type: 'varchar'})
    profile: string;
}
