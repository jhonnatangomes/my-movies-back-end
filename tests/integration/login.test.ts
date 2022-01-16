import supertest from 'supertest';
import app, { init } from '../../src/app';
import { deleteTables, endConnection } from '../connection/database';
import numberFactory from '../factories/numberFactory';
import { createSession, getSessionByToken } from '../factories/sessionFactory';
import {
    getSession,
    incorrectSignInFactory,
    signInFactory,
    signUp,
} from '../factories/signInFactory';
import {
    getUser,
    incorrectSignUpFactory,
    signUpFactory,
    User,
} from '../factories/signUpFactory';
import stringFactory from '../factories/stringFactory';

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

describe('post /sign-in', () => {
    let user: User;

    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 400 for an incorrect body sent', async () => {
        const body = incorrectSignInFactory();
        const result = await agent.post('/sign-in').send(body);
        expect(result.status).toEqual(400);
    });

    it('returns 404 for a non-registered email', async () => {
        const body = signInFactory();
        const result = await agent.post('/sign-in').send(body);
        expect(result.status).toEqual(404);
    });

    it('returns 404 for an incorrect password', async () => {
        user = await signUp();
        const body = {
            email: user.email,
            password: stringFactory(),
        };
        const result = await agent.post('/sign-in').send(body);
        expect(result.status).toEqual(404);
    });

    it('returns 200 for correct email and password and returns token', async () => {
        const body = {
            email: user.email,
            password: user.password,
        };

        const result = await agent.post('/sign-in').send(body);
        const session = await getSession(body.email.toString());
        expect(result.status).toEqual(200);
        expect(result.body.token).toEqual(session.token);
    });
});

describe('post /logout', () => {
    let token: string;

    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 400 when no token is sent', async () => {
        const result = await agent.post('/logout');
        expect(result.status).toEqual(400);
    });

    it('returns 400 when a non-string token is sent', async () => {
        const body = {
            token: numberFactory(),
        };
        const result = await agent.post('/logout').send(body);
        expect(result.status).toEqual(400);
    });

    it('returns 404 when a non-existent token is sent', async () => {
        const body = {
            token: stringFactory(),
        };
        const result = await agent.post('/logout').send(body);
        expect(result.status).toEqual(404);
    });

    it('returns 200 and logs out the user when an existent token is passed', async () => {
        token = await createSession();
        const body = { token };
        const result = await agent.post('/logout').send(body);
        const session = await getSessionByToken(token);
        expect(result.status).toEqual(200);
        expect(session).toEqual(undefined);
    });
});
