import faker from '@faker-js/faker';
import { getRepository } from 'typeorm';
import SessionEntity from '../../src/entities/SessionEntity';
import UserEntity from '../../src/entities/UserEntity';
import getRandomElement from '../helpers/getRandomElement';
import BCryptAdapter from '../../src/adapters/BcryptAdapter';

const bcryptAdapter = new BCryptAdapter(12);

function incorrectSignInFactory() {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    const incorrectUsers = [
        { ...user, email: faker.datatype.number() },
        { ...user, password: faker.datatype.number() },
    ];

    const randomUser = getRandomElement(incorrectUsers);
    return randomUser;
}

function signInFactory() {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    return user;
}

async function getSession(email: string) {
    const user = await getRepository(UserEntity).findOne({ email });
    const session = await getRepository(SessionEntity).findOne({ user });
    return session;
}

async function signUp() {
    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    const encryptedPassword = bcryptAdapter.encrypt(user.password);

    const userToSave = getRepository(UserEntity).create({
        name: user.name,
        email: user.email,
        password: encryptedPassword,
    });
    await getRepository(UserEntity).save(userToSave);
    return user;
}

export { incorrectSignInFactory, signInFactory, getSession, signUp };
