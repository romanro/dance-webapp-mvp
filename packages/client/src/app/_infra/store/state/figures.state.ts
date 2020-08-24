import { Figure } from '@core/models/';


export class FiguresState {
    figures: Array<Figure> | null;
    error: Error | string | null; // track errors
}

export const initializeFiguresState = () => {
    return { figures: Array<Figure>(), error: null };
};
