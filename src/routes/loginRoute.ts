import { Router } from 'express';
import * as loginController from '../controllers/loginController';

export default (router: Router) => {
    router.post('/sign-up', loginController.signUp);
    router.post('/sign-in', loginController.login);
};
