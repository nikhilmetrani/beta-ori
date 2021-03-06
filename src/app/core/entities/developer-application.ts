import {User, Category, Installer} from '../';

export interface DeveloperApplication {
    rid: string;
    name: string;
    description: string;
    version: string;
    category: Category;
    whatsNew: string;
    state: string;
    developer: User;
    installers: Installer[];
}
