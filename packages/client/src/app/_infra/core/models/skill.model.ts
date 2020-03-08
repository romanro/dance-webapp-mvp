import { StarBasicInfo } from './star.model';
import { FigureVideo } from './video.model';

export interface StarSkill {
    id: string;
    starBasicInfo: StarBasicInfo;
    FigureVideo: FigureVideo;
    videoCoverUrl: string;
    videoPreviewUrl: string;
}

