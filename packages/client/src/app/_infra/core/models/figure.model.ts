import { DanceType } from './star-content.model';
import { Video } from './video.model';

export interface Figure {
    _id: string;
    stars: Array<string>;
    videos: Array<string> | Array<Video>;
    name: string;
    coverURL: string;
    type: DanceType;
    level: string;
    createdAt: Date,
    updatedAt: Date,

}



export interface DanceFigure {
    number: number;
    figure: Figure;
}
