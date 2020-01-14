import { Tag } from './tag.model';
import { FigureVideo } from './video.model';

export interface Dance {
    id: string;
    name: string;
    coverImageUrl: string;
    tags: Tag[];
    partnerFigures: Figure[];
    soloFigures: Figure[];
    description?: string;
}

export interface Figure {
    id: string;
    name: string;
    coverImageUrl: string;
    isAdvanced: boolean;
    levels: FigureLevel[];
    description?: string;
    exercises?: any[];
    suggestion?: string;
}

export interface FigureLevel {
    level: Level;
    classVideoUrl: string;
    coverImageUrl: string;
    videos: FigureVideo[];
}

export enum Level {
    'Beginner' = 0,
    'Intermediate' = 1,
    'Advanced' = 2
}
