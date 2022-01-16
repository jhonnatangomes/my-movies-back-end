import { getConnection } from 'typeorm';
import UserEntity from '../../src/entities/UserEntity';
import SessionEntity from '../../src/entities/SessionEntity';
import FavoriteEntity from '../../src/entities/FavoriteEntity';

async function deleteTables() {
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(SessionEntity)
        .execute();
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(FavoriteEntity)
        .execute();
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .execute();
}

async function endConnection() {
    await getConnection().close();
}

export { endConnection, deleteTables };
