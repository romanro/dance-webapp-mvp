import { Star } from '@core/models/';

export class StarsState {
    stars: Array<Star>;
}

export const initializeStarsState = () => {
    return { stars: Array<Star>() };
};
