import { NextFunction, Request, Response } from 'express';
import BCryptAdapter from '../adapters/BcryptAdapter';
import UserEntity from '../entities/UserEntity';
import LoginService from '../services/LoginService';
import { validateSignUp } from '../validations/validateSignUp';

const bcryptAdapter = new BCryptAdapter(12);
const loginService = new LoginService(UserEntity, bcryptAdapter);

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const signUpValidation = validateSignUp(req.body);
        if (!signUpValidation.isValid) {
            return res.status(400).send(signUpValidation.message);
        }
        await loginService.signUp(req.body);
        return res.sendStatus(201);
    } catch (error) {
        if (error.type === 'Conflict') {
            return res.status(409).send(error.message);
        }
        return next(error);
    }
}

export { signUp };
