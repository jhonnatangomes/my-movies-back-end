/* eslint-disable no-unused-vars */
interface EncryptAdapter {
    encrypt(text: string): string;
    compare(text: string, encryptedText: string): boolean;
}

export { EncryptAdapter };
