import { StarContent } from '@core/models';

export class StarContentState {
    starsContent: Array<StarContent> | null;
    error: Error | string | null; // track errors
}

export const initializeStarContentState = () => {
    return { starsContent: Array<StarContent>(), error: null };
};
