import { Star, StarBasicInfo } from '@core/models';

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
    },
    {
        id: '2',
        name: {
            firstName: 'Anthony',
            lastName: 'Cool',
            midName: 'Dancer'
        },
        location: {
            city: 'Moscow',
            country: 'Russia'
        },
        birthDate: '20-1-1982',
        tags: [{ id: '1', text: 'salsa' }, { id: '3', text: 'ballroom' }],
        userPics: {
            smallPicURL: 'https://laicos.com/wp-content/uploads/2018/10/ryan-avatar-square-300x300.jpeg',
            largePicURL: 'https://n4m6x6k6.stackpathcdn.com/wp-content/uploads/2012/05/man-dancing.jpg'
        },
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 25 years of experience. Born in Moscow, Russia. Very good one.'
    }
];


export const MOCK_STAR_1_BI: StarBasicInfo = {
    id: MOCK_STARS[0].id,
    name: MOCK_STARS[0].name,
    userPics: MOCK_STARS[0].userPics
};


export const MOCK_STAR_2_BI: StarBasicInfo = {
    id: MOCK_STARS[1].id,
    name: MOCK_STARS[1].name,
    userPics: MOCK_STARS[1].userPics
};
