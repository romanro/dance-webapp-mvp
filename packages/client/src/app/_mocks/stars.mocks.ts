import { Star } from '@core/models';

export const MOCK_STARS: Array<Star> = [
    {
        id: '1',
        name: {
            firstName: 'Nina',
            lastName: 'Trump',
            nickname: 'Superstar'
        },
        location: {
            city: 'Tel-Aviv',
            country: 'Israel'
        },
        birthDate: '20-1-1981',
        tags: [{ id: '1', text: 'salsa' }, { id: '2', text: 'classic' }],
        userPics: {
            smallPicURL: 'https://i.pinimg.com/originals/6b/7d/9f/6b7d9fd9d66a97db5abe4b7952aeeb87.png',
            largePicURL: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original'
        },
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 20 years of experience. Born in Moscow, Russia.'
    }
];
