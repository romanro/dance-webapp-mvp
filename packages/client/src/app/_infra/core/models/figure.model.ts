import { DanceType } from './star-content.model';
import { Video } from './video.model';

export interface Figure {
    _id: string;
    stars: Array<string>;
    videos: Array<string> | Array<Video>;
    name: string;
    logo: string;
    type: DanceType;
    level: string;
    createdAt?: Date,
    updatedAt?: Date
}
