import { Video } from '@models/video.model';

export class Practice {
  _id: string;
  associatedVideo: Video;
  createdAt: string;
  updatedAt: string;
  _v: number

}

export enum PracticeError {
  GET = 'STAR.ERRORS.getPracticesError',
  GENERAL = 'ERRORS.GeneralBackendError'
}

export interface CreatePracticeData extends FormData {
  name?: string;
  associatedVideoId?: string;
  video?: File;
}
