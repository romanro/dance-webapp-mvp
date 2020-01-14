import { Tag } from './tag.model';
import { Location } from './user.model';

export interface Star {
    id: string;
    name: Name;
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
    midName?: string;
    nickname?: string;
}

export interface StarUserPics {
    smallPicURL: string;
    largePicURL: string;
}

export interface StarBasicInfo {
    id: string;
    name: Name;
    userPics: StarUserPics;
}
