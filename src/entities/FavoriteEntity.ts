/* eslint-disable indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './UserEntity';

@Entity('favorites')
export default class FavoriteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movieId: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
