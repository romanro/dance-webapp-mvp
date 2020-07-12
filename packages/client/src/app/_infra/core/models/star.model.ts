import { Tag } from './tag.model';
import { Location } from './user.model';

export interface Star {
    _id: string;
    name: Name;
    slug: string;
    location: Location;
    birthDate: string;
    tags: Tag[];
    userPics: StarUserPics;
    promoVideoURL: string;
    about: string;
}

export interface Name {
    firstName: string;
    lastName: string;
    nickname?: string;
}

export interface StarUserPics {
    smallPicURL: string;
    largePicURL: string;
}

export interface StarBasicInfo {
    _id: string;
    name: Name;
    userPics: StarUserPics;
}


export enum StarError {
    GET = 'STAR.ERRORS.getStarsError',
    GENERAL = 'ERRORS.GeneralBackendError'
}
