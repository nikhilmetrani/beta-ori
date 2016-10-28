import {User} from '../';

export interface DeveloperApplication {
    rid: number;
    name: string;
    description: string;
    version: string;
    downloadUrl: string;
    category: string;
    whatsNew: string;
    state: string;
    developer: User;
}
