
export class Practice {
    id: number;
    date: Date;
    title: string;
    subTitle: string;
    userVideo: string;
    notes: Array<string>;
}

export enum PracticeError {
  GET = 'STAR.ERRORS.getPracticesError',
  GENERAL = 'ERRORS.GeneralBackendError'
}
