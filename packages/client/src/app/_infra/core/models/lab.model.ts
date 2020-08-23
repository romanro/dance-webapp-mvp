import { Figure } from './figure.model';
import { Star } from './star.model';
import { LabStarVideo } from './video.model';

export interface LabItem {
    star: Star;
    figure: Figure;
    video: LabStarVideo;
}