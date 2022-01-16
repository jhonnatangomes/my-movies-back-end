import BaseService from './BaseService';
import { TokenAdapter } from '../protocols/tokenAdapter';
import { Login } from '../protocols/login';
import APIError from '../errors/ConflictError';
import { EncryptAdapter } from '../protocols/encryptAdapter';

export default class SessionService extends BaseService {
    private uuid: TokenAdapter;

    private encrypter: EncryptAdapter;

    private userService: any;

    constructor(
        entity: any,
        userService: any,
        uuid: TokenAdapter,
        encrypter: EncryptAdapter
    ) {
        super(entity);
        this.uuid = uuid;
        this.userService = userService;
        this.encrypter = encrypter;
    }

    async login(user: Login) {
        const { email, password } = user;
        const userByEmail = await this.userService.getUserByEmail(email);

        if (
            !userByEmail ||
            !this.encrypter.compare(password, userByEmail.password)
        ) {
            throw new APIError('email and/or password invalid', 'NotFound');
        }

        const token = this.uuid.generate();
        const session = super.getEntity().create({ token, user: userByEmail });
        await super.getEntity().save(session);
        return token;
    }
}
