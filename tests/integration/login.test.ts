import supertest from 'supertest';
import app, { init } from '../../src/app';
import { deleteTables, endConnection } from '../connection/database';
import {
    getUser,
    incorrectSignUpFactory,
    signUpFactory,
    User,
} from '../factories/signUpFactory';

const agent = supertest(app);

beforeAll(async () => {
    await init();
});

afterAll(async () => {
    await deleteTables();
    await endConnection();
});

describe('post /sign-up', () => {
    let body: User;

    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 400 for an incorrect body sent', async () => {
        body = incorrectSignUpFactory();
        const result = await agent.post('/sign-up').send(body);
        expect(result.status).toEqual(400);
    });

    it('returns 200 and registers user on database', async () => {
        body = signUpFactory();
        const result = await agent.post('/sign-up').send(body);
        const user = await getUser(body.email.toString());
        expect(result.status).toEqual(201);
        expect(user).not.toEqual(undefined);
    });

    it('returns 409 when trying to sign up with an already existing email', async () => {
        const result = await agent.post('/sign-up').send(body);
        expect(result.status).toEqual(409);
    });
});
