export class BackgroundProcess {
    type: BackgroundProcessType;
    processtId: string;
    data?: any;

    constructor(init?: Partial<BackgroundProcess>) {
        Object.assign(this, init);
    }
}

export enum BackgroundProcessType {
    UPLOAD_PRACTICE = 'uploadPractice'
}