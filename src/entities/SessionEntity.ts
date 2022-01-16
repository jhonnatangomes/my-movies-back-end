/* eslint-disable indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './UserEntity';

@Entity('sessions')
export default class SessionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
