import { Figure } from './figure.model';

export interface StarContent {
    starId: string;
    dances: Array<StarContentDance>
}

export enum DanceType {
    //Latin
    CHA_CHA_CHA = 'cha cha cha',
    SAMBA = 'samba',
    RUMBA = 'rumba',
    PASODOBLE = 'pasodoble',
    JIVE = 'jive',

    // Standard
    WALTZ = 'waltz',
    TANGO = 'tango',
    VIENNESE_WALTZ = 'viennese waltz',
    FOXTROT = 'foxtrot',
    QUICKSTEP = 'quickstep',
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
