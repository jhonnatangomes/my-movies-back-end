import bcrypt from 'bcrypt';
import { EncryptAdapter } from '../protocols/encryptAdapter';

export default class BCryptAdapter implements EncryptAdapter {
    private salt = 10;

    constructor(salt: number) {
        this.salt = salt;
    }

    encrypt(text: string): string {
        return bcrypt.hashSync(text, this.salt);
    }

    compare(text: string, encryptedText: string): boolean {
        return bcrypt.compareSync(text, encryptedText);
    }
}
