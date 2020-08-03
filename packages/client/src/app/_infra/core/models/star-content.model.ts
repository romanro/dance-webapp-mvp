import { Figure } from '.';

export interface StarContent {
    starId: string;
    dances: Array<StarContentDance>
}

export enum DanceType {
    WALTZ = 'waltz',
    TANGO = 'tango',
    QUICKSTEP = 'quickstep',
    FOXTROT = 'foxtrot'
}

export interface StarContentDance {
    type: DanceType;
    levels: Array<StarDanceLevel>;
}

export interface StarDanceLevel {
    level: string;
    figures: Array<Figure>;
}


export enum StarContentError {
    GET = 'STAR.ERRORS.getStarContentError',
    GENERAL = 'ERRORS.GeneralBackendError'
}
