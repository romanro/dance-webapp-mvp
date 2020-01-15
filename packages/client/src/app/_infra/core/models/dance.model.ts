import { Tag } from './tag.model';

export interface Dance {
    id: string;
    name: string;
    coverImageUrl: string;
    starsId: string[];
    tags: Tag[];
    partnerFigures: string[];
    soloFigures: string[];
    description?: string;
}


