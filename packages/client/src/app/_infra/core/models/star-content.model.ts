import { Dance, DanceFigure } from '.';

export interface StarContent {
    starId: string;
    dances: Array<StarDance>;
}

export interface StarDance {
    dance: Dance;
    levels: Array<StarDanceLevel>;
}

export interface StarDanceLevel {
    level: DanceLevelNumber;
    figures: Array<DanceFigure>;
}

export type DanceLevelNumber = 1 | 2 | 3;

export enum DanceLevel {
    'beginner',
    'intermediate',
    'advanced'
}

export enum StarContentError {
    GET = 'STAR.ERRORS.getStarContentError',
    GENERAL = 'ERRORS.GeneralBackendError'
}
