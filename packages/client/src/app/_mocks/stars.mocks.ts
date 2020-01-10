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
        tags: [{ id: '1', text: 'salsa' }],
        userPics: {
            smallPicURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23960348.1569618167!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/autumn-alexander.jpg',
            largePicURL: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original'
        },
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 20 years of experience. Born in Moscow, Russia.'
    }
];
