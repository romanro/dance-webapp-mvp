import { Practice } from '@core/models/';

export class PracticesState {
    practices: Array<Practice> | null;
    error: Error | string | null; // track errors
}

export const initializePracticesState = () => {
    return { practices: null, error: null };
};
