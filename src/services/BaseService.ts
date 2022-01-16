import { getRepository } from 'typeorm';

export default abstract class BaseService {
    private entity: any;

    constructor(entity: any) {
        this.entity = entity;
    }

    getEntity() {
        return getRepository(this.entity);
    }
}
