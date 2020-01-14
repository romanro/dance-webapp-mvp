export interface SkillVideo {
    id: string;
    views: View[];
    soundTrackUrl: string;
}

export interface View {
    id: string;
    direction: ViewDirection;
    videoUrl: string;
}

export enum ViewDirection {
    RIGHT = 'right',
    LEFT = 'left',
    FRONT = 'front',
    BACK = 'back'
}
