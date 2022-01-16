import { v1, v4 } from 'uuid';
import { TokenAdapter } from '../protocols/tokenAdapter';

export default class UuidAdapter implements TokenAdapter {
    version: 'v4' | 'v1' = 'v4';

    uuid: Function;

    constructor(version: 'v1' | 'v4') {
        if (version === 'v1') {
            this.uuid = v1;
        }
        if (version === 'v4') {
            this.uuid = v4;
        }
    }

    generate(): string {
        return this.uuid();
    }
}
