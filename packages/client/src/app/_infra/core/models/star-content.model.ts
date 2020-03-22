import { Dance, DanceFigure } from '.';

export interface StarContent {
    starId: string;
    dances: Array<StarDance>;
}

export interface StarDance {
    dance: Dance;
    levels: Array<any>;
}

export interface StarDanceLevel {
    level: DanceLevelNumber;
    figures: Array<DanceFigure>;
}

export type DanceLevelNumber = 1 | 2 | 3;

export enum DanceLevel {
    'beginner' = 1,
    'intermediate' = 2,
    'advanced' = 3
}
