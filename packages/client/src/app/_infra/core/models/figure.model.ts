export interface Figure {
    id: string;
    name: string;
    coverURL: string;
}

export interface DanceFigure {
    number: number;
    figure: Figure;
}
