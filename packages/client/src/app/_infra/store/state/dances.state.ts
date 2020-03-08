import { Dance } from '@core/models/dance.model';


export class DancesState {
    dances: Array<Dance>;
}

export const initializeDancesState = () => {
    return { dances: Array<Dance>() };
};
