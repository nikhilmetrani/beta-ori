import { User, Category } from '../';

export interface FeaturedApplication {
    rid: number;
    name: string;
    description: string;
    version: string;
    downloadUrl: string;
    category: Category;
    whatsNew: string;
    state: string;
    developer: User;
}
