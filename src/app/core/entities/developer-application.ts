import {User} from '../';

export interface DeveloperApplication {
    rid: number;
    name: string;
    version: string;
    downloadUrl: string;
    category: string;
    status: string;
    developer: User;
}
