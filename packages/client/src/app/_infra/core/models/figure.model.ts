import { FigureVideo } from './video.model';

export interface Figure {
    id: string;
    name: string;
    coverImageUrl: string;
    isAdvanced: boolean;
    levels: FigureLevel[];
    description?: string;
    exercises?: Exercise[];
    suggestion?: string;
    relatedFigures?: string[];
}

export interface FigureLevel {
    id: string;
    starsId: string[];
    level: Level;
    classVideoUrl: string;
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