import { Figure } from './figure.model';
import { Practice } from './practices.model';
import { Star } from './star.model';
import { LabStarVideo, LabUserVideo } from './video.model';

export interface LabItem {
    star: Star;
    figure: Figure;
    starVideo: LabStarVideo;
    userVideo?: LabUserVideo;
    practice?: Practice;
}

export const LAB_USER_VIDEO_DURATION_DIFF_LIMIT = 6;

export enum LabViewType {
    FULL = 'full',
    PREVIEW = 'preview',
    EMPTY = 'empty'
}

export enum LabPlayerType {
    MASTER = 'master',
    STUDENT = 'student'
}

export type LabPlayerPlaybackOperator = 'plus' | 'minus' | 'def';
export type LabPlayerJumpDirection = 'bwd' | 'fwd';
