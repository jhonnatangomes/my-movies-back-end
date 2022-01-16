import { NextFunction, Request, Response } from 'express';
import BCryptAdapter from '../adapters/BcryptAdapter';
import UuidAdapter from '../adapters/UuidAdapter';
import SessionEntity from '../entities/SessionEntity';
import UserEntity from '../entities/UserEntity';
import SessionService from '../services/SessionService';
import UserService from '../services/UserService';
import { validateLogin } from '../validations/validateLogin';
import { validateSignUp } from '../validations/validateSignUp';

const bcryptAdapter = new BCryptAdapter(12);
const uuidAdapter = new UuidAdapter('v4');
const userService = new UserService(UserEntity, bcryptAdapter);
const sessionService = new SessionService(
    SessionEntity,
    userService,
    uuidAdapter,
    bcryptAdapter
);

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const signUpValidation = validateSignUp(req.body);
        if (!signUpValidation.isValid) {
            return res.status(400).send(signUpValidation.message);
        }
        await userService.signUp(req.body);
        return res.sendStatus(201);
    } catch (error) {
        if (error.type === 'Conflict') {
            return res.status(409).send(error.message);
        }
        return next(error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const loginValidation = validateLogin(req.body);
        if (!loginValidation.isValid) {
            return res.status(400).send(loginValidation.message);
        }
        const token = await sessionService.login(req.body);
        return res.send(token);
    } catch (error) {
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        return next(error);
    }
}

export { signUp, login };
