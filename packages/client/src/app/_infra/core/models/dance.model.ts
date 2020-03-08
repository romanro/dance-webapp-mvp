import { Tag } from './tag.model';

export interface Dance {
    id: string;
    name: string;
    coverImageUrl: string;
    starId: string;
    tags: Tag[];
    partnerFigures: string[];
    soloFigures: string[];
    description?: string;
}


