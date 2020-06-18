export interface Figure {
    id: string;
    date: Date;
    title: string;
    subTitle: string;
    userVideo: string;
    notes: any
}

export interface DanceFigure {
    number: number;
    figure: Figure;
}
