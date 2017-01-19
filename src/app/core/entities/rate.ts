import {User} from '../';

export interface Rate {
    rid: string;
    applicationId: string;
    rating: string;
    consumer: User;
    createBy: string;
}
