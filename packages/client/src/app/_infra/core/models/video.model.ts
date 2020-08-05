

export interface Video {
    name: string;
    path: string;
    view: View;
    participatesAmount: ParticipatesAmount;
    associateWith: AssociateType;
    type: VideoType;
    coverURL: string;
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
    VIDEO = 'video',
    FIGURE = 'figure'
}

export enum VideoType {
    // the following states are used for star only
    PROMO = 'promo',
    BASIC_PRINCIPLES = 'basicPrinciples',
    ADDITIONAL = 'additional',

    // the following states are shared for star and user
    COMPARABLE = 'comparable'
}

export class LabStarVideo implements Video {
    name: string;
    path: string;
    view: View;
    coverURL: string;
    participatesAmount: ParticipatesAmount;
    associateWith: AssociateType = AssociateType.VIDEO;
    type: VideoType = VideoType.COMPARABLE;
}
