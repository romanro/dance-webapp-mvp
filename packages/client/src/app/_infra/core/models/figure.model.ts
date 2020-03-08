import { FigureVideo } from './video.model';

export interface Figure {
    id: string;
    starId: string;
    name: string;
    coverImageUrl: string;
    classVideoUrl: string;
    isAdvanced: boolean;
    levels: FigureLevel[];
    description?: string;
    exercises?: Exercise[];
    suggestion?: string;
    relatedFigures?: string[];
}

export interface FigureLevel {
    id: string;
    level: Level;
    coverImageUrl: string;
    videos: FigureVideo[];
}

export interface Exercise {
    id: string;
    name: string;
    coverImageUrl: string;
    videoUrl: string;
    description?: string;
}

export enum Level {
    'Beginner' = 0,
    'Intermediate' = 1,
    'Advanced' = 2
}
