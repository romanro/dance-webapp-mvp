import { Dance, StarContent, StarDanceLevel } from '@core/models';

const MOCK_DANCES: Array<Dance> = [
    { id: '43344', name: 'waltz' },
    { id: '42244', name: 'tango' },
    { id: '43335', name: 'quickstep' },
    { id: '43544', name: 'foxtrot' }
];

const MOCK_DANCE_LEVELS_1: Array<StarDanceLevel> = [
    { level: 1, figures: [] },
    { level: 2, figures: [] },
    { level: 3, figures: [] }
];

export const MOCK_STARS_CONTENT: Array<StarContent> = [
    {
        starId: '1',
        dances: [
            { dance: MOCK_DANCES[0], levels: [...MOCK_DANCE_LEVELS_1] },
            { dance: MOCK_DANCES[1], levels: [] },
            { dance: MOCK_DANCES[2], levels: [] }
        ]
    },
    {
        starId: '2',
        dances: []
    },
    {
        starId: '3',
        dances: []
    }
];



