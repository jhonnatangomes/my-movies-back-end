import UuidAdapter from '../../src/adapters/UuidAdapter';
import { getRepository } from 'typeorm';
import SessionEntity from '../../src/entities/SessionEntity';
import UserEntity from '../../src/entities/UserEntity';
import { signUpFactory } from './signUpFactory';

const uuidAdapter = new UuidAdapter('v4');

async function createSession() {
    const user = signUpFactory();
    const userToSave = getRepository(UserEntity).create(user);
    await getRepository(UserEntity).save(userToSave);
    const token = uuidAdapter.generate();
    const session = getRepository(SessionEntity).create({
        user: userToSave,
        token,
    });
    await getRepository(SessionEntity).save(session);
    return session.token;
}

async function getSessionByToken(token: string) {
    const session = await getRepository(SessionEntity).findOne({ token });
    return session;
}

export { createSession, getSessionByToken };
