import { Dance, DanceFigure, Name, StarUserPics } from '.';

export interface StarContent {
    about: string;
    birthDate: Date;
    createdAt: Date;
    danceTypes: Array<string>;
    location: Location;
    name: Name;
    slug: string;
    promoVideoURL: string;
    updatedAt: Date;
    userPics: StarUserPics;
    _id: string
}

export interface StarDanceLevel {
    level: DanceLevelNumber;
    figures: Array<DanceFigure>;
}

export type DanceLevelNumber = 1 | 2 | 3;

export enum DanceLevel {
    beginner = 1,
    intermediate = 2,
    advanced = 3
}

export enum StarContentError {
    GET = 'STAR.ERRORS.getStarContentError',
    GENERAL = 'ERRORS.GeneralBackendError'
}
