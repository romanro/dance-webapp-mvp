import { Figure } from './figure.model';
import { Star } from './star.model';
import { LabStarVideo, LabUserVideo } from './video.model';

export interface LabItem {
    star: Star;
    figure: Figure;
    starVideo: LabStarVideo;
    userVideo?: LabUserVideo;
}