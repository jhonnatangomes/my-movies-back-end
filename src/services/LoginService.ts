import APIError from '../errors/ConflictError';
import { EncryptAdapter } from '../protocols/encryptAdapter';
import { SignUp } from '../protocols/login';
import BaseService from './BaseService';

export default class LoginService extends BaseService {
    encrypter: EncryptAdapter;

    constructor(entity: any, encrypter: EncryptAdapter) {
        super(entity);
        this.encrypter = encrypter;
    }

    async signUp(user: SignUp) {
        const { name, email, password } = user;

        const userByEmail = await super.getEntity().findOne({ email });
        if (userByEmail) {
            throw new APIError('This email is already registered', 'Conflict');
        }

        const encryptedPassword = this.encrypter.encrypt(password);
        const newUser = super
            .getEntity()
            .create({ name, email, password: encryptedPassword });
        await super.getEntity().save(newUser);
    }
}
