import { Figure } from '@core/models';

export class FiguresState {
    figures: Array<Figure>;
}

export const initializeFiguresState = () => {
    return { figures: Array<Figure>() };
};
