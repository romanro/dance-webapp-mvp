export interface Figure {
    id: string;
    name: string;
    coverURL: string;
    type: string;
    level: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DanceFigure {
    number: number;
    figure: Figure;
}
