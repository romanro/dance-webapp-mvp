
const MOCK_DANCES: Array<any> = [
    { id: '43344', name: 'waltz' },
    { id: '42244', name: 'tango' },
    { id: '43335', name: 'quickstep' },
    { id: '43544', name: 'foxtrot' }
];

const MOCK_FIGURES: Array<any> = [
    { id: 'fig1', name: 'figura 1', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg', type: '', level: '', createdAt: new Date(), updatedAt: new Date() },
    { id: 'fig2', name: 'figura 2', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg', type: '', level: '', createdAt: new Date(), updatedAt: new Date() },
];

const MOCK_DANCE_LEVELS_1: Array<any> = [
    {
        level: 1, figures: [
            {
                number: 1,
                figure: MOCK_FIGURES[0]
            },
            {
                number: 2,
                figure: MOCK_FIGURES[1]
            },
        ]
    },
    {
        level: 2, figures: [
            {
                number: 1,
                figure: MOCK_FIGURES[0]
            },
            {
                number: 2,
                figure: MOCK_FIGURES[1]
            },
        ]
    },
    {
        level: 3, figures: [
            {
                number: 1,
                figure: MOCK_FIGURES[0]
            },
            {
                number: 2,
                figure: MOCK_FIGURES[1]
            },
        ]
    }
];



