import { Tag } from './tag.model';

export interface Dance {
    id: string;
    name: string;
    tags?: Array<Tag>;
}
