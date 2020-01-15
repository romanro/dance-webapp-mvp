import { Dance } from '@app/_infra/core/models';


export const MOCK_DANCES: Array<Dance> = [
    {
        id: '1',
        name: 'Valse',
        coverImageUrl: 'https://www.wikidancesport.com/Attachments/dances/Waltz/dancesport.jpg',
        starsId: ['2'],
        tags: [{ id: '4', text: 'valse' }, { id: '3', text: 'ballroom' }],
        partnerFigures: ['2'],
        soloFigures: ['1'],
        description: 'Super-pulper valse. Veri difficult to dance'
    }
];



