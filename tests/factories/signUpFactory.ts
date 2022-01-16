import faker from '@faker-js/faker';
import { getRepository } from 'typeorm';
import UserEntity from '../../src/entities/UserEntity';
import getRandomElement from '../helpers/getRandomElement';

export interface User {
    name: string | number;
    email: string | number;
    password: string | number;
}

function incorrectSignUpFactory() {
    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    const incorrectUsers = [
        { ...user, name: faker.datatype.number() },
        { ...user, email: faker.datatype.number() },
        { ...user, password: faker.datatype.number() },
    ];

    const randomUser = getRandomElement(incorrectUsers);
    return randomUser;
}

function signUpFactory() {
    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    return user;
}

async function getUser(email: string) {
    const user = await getRepository(UserEntity).findOne({ email });
    return user;
}

export { signUpFactory, incorrectSignUpFactory, getUser };
