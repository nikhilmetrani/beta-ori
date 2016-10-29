import {User, DeveloperApplication} from '../';

export interface DeveloperApplicationsBundle {
    rid: number;
    name: string;
    description: string;
    category: string;
    state: string;
    developer: User;
    applications: DeveloperApplication[];
}
