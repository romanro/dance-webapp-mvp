import { Figure } from './figure.model';
import { Star } from './star.model';
import { LabStarVideo, LabUserVideo } from './video.model';

export interface LabItem {
    star: Star;
    figure: Figure;
    starVideo: LabStarVideo;
    userVideo?: LabUserVideo;
}

export const LAB_USER_VIDEO_DURATION_DIFF_LIMIT = 6;

export enum LabViewType {
    FULL = 'full',
    PREVIEW = 'preview',
    EMPTY = 'empty'
}