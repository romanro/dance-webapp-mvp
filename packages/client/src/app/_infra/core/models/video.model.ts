

export interface Video {
    name: string;
    key: string;
    view: View;
    participatesAmount: ParticipatesAmount;
    associatedObject: string;
    associatedModel: AssociateType;
    ownerUser: string;
    ownerRole: number;
    type: VideoType;
    thumbnail: string;
}

export enum View {
    FRONT = 'front',
    BACK = 'back'
}

export enum ParticipatesAmount {
    SOLO = 1,
    COUPLE = 2
}

export enum AssociateType {
    VIDEO = 'Video',
    FIGURE = 'Figure'
}

export enum VideoType {
    // the following states are used for star only
    PROMO = 'promo',
    BASIC_PRINCIPLES = 'basicPrinciples',
    TIPS = 'tips',
    EXERCISES = 'exercises',

    // the following states are shared for star and user
    COMPARABLE = 'comparable'
}

export class LabStarVideo implements Video {
    name: string;
    key: string;
    view: View;
    thumbnail: string;
    participatesAmount: ParticipatesAmount;
    associatedObject: string;
    associatedModel: AssociateType = AssociateType.FIGURE;
    ownerUser: string;
    ownerRole: number;
    type: VideoType = VideoType.COMPARABLE;
}

export class LabUserVideo implements Video {
    name: string;
    key: string;
    view: View;
    thumbnail: string;
    participatesAmount: ParticipatesAmount;
    associatedObject: string;
    associatedModel: AssociateType = AssociateType.VIDEO;
    ownerUser: string;
    ownerRole: number;
    type: VideoType = VideoType.COMPARABLE;
}

