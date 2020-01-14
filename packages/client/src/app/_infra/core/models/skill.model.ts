import { StarBasicInfo } from './star.model';
import { SkillVideo } from './video.model';

export interface StarSkill {
    id: string;
    starBasicInfo: StarBasicInfo;
    figure: Figure;
    skillVideo: SkillVideo;
    videoCoverUrl: string;
    videoPreviewUrl: string;
}

export interface Figure {
    id: string;
    level: Level;
    type: FigureType;
    name: string;
}

export enum Level {
    'Beginner' = 0,
    'Elementary' = 1,
    'Intermediate' = 2,
    'Advanced' = 3,
    'Proficient' = 4
}

export enum FigureType {
    STEP = 'step',
    MOVE = 'move'
}

