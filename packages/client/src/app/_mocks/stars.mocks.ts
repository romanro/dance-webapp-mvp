import { Star, StarBasicInfo } from '@core/models';

export const MOCK_STARS: Array<Star> = [
    {
        _id: '1',
        name: {
            firstName: 'Nina',
            lastName: 'Trump',
            nickname: 'Superstar'
        },
        slug: 'nina-trump',
        location: {
            city: 'Tel-Aviv',
            country: 'Israel'
        },
        birthDate: '20-1-1981', tags: [{ id: '1', text: 'salsa' }, { id: '4', text: 'ballet' }],
        userPics: {
            smallPicURL: 'https://i.pinimg.com/originals/6b/7d/9f/6b7d9fd9d66a97db5abe4b7952aeeb87.png',
            largePicURL: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original'
        },
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 20 years of experience. Born in Moscow, Russia.',
    },
    {
        _id: '2',
        name: {
            firstName: 'Anthony',
            lastName: 'Cool',
        },
        slug: 'ant-cool',
        location: {
            city: 'Moscow',
            country: 'Russia'
        },
        birthDate: '20-1-1982', tags: [{ id: '1', text: 'salsa' }, { id: '4', text: 'ballet' }],
        userPics: {
            smallPicURL: 'https://laicos.com/wp-content/uploads/2018/10/ryan-avatar-square-300x300.jpeg',
            largePicURL: 'https://resize.hswstatic.com/w_907/gif/now-a1206e17-134e-4a52-80e0-036e9c6d01b8-1210-680.jpg'
        },
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 25 years of experience. Born in Moscow, Russia. Very good one.'
    },
    {
        _id: '3',
        name: {
            firstName: 'Vasil',
            lastName: 'Super',
            nickname: 'Mario'
        },
        slug: 'vasil-mario-cool',
        location: {
            city: 'New York',
            country: 'USA'
        },
        birthDate: '20-1-1981',
        tags: [{ id: '1', text: 'salsa' }, { id: '4', text: 'ballet' }],
        userPics: {
            smallPicURL: 'https://laicos.com/wp-content/uploads/2018/10/ryan-avatar-square-300x300.jpeg',
            largePicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToSkGWQ9xVdSYD6I0qmAdg8NuaQzNvKjwR3eXh1bVfRyyPja9B'
        },
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 25 years of experience. Born in Moscow, Russia. Very good one.',
    }
];


export const MOCK_STAR_1_BI: StarBasicInfo = {
    _id: MOCK_STARS[0]._id,
    name: MOCK_STARS[0].name,
    userPics: MOCK_STARS[0].userPics
};


export const MOCK_STAR_2_BI: StarBasicInfo = {
    _id: MOCK_STARS[1]._id,
    name: MOCK_STARS[1].name,
    userPics: MOCK_STARS[1].userPics
};
