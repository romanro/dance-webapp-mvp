import { LabItem } from '@core/models/';


/* const MOCK_LAB = {
    star: {
        name: {
            firstName: 'Paul',
            lastName: 'Moldovan'
        },
        location: {
            country: 'Romania'
        },
        logo: {
            small: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/logo.jpg',
            large: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/logo.jpg'
        },
        figures: [
            '5f4101a2f3f8fd3386e9dce0'
        ],
        achievements: [
            '3rd place World cup',
            '3rd place European cup',
            '2x Semi final World champoinship',
            '2x Semi final European championship',
            '2x GOC semi final',
            '5x Latvian champions'
        ],
        _id: '5f40fe6ad1f6082d42e9708b',
        promoVideo: 'https://danskill-streaming-video-optimized.s3-eu-west-1.amazonaws.com/stars/paul_moldovan/PROMO_OF_PAUL_MOLDOVAN.mp4',
        about: '',
        slug: 'Paul-Moldovan',
        createdAt: '2020-08-22T11:15:54.964Z',
        updatedAt: '2020-08-22T11:29:38.931Z',
        __v: 0
    },
    figure: {
        stars: [
            '5f40fe6ad1f6082d42e9708b'
        ],
        videos: [
            {
                _id: '5f4151336391ed647f4df9c1',
                name: 'Fake it till you make it',
                view: 'front',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                path: 'https://danskill-streaming-video-optimized.s3-eu-west-1.amazonaws.com/stars/paul_moldovan/Rumba/Level%2B3/Opening%2BOut/RUMBA_L3_OPENING_OUT_MY_LAB_PAUL.mp4',
                type: 'promo',
                createdAt: '2020-08-22T17:09:07.596Z',
                updatedAt: '2020-08-22T17:09:07.596Z',
                __v: 0
            },
            {
                _id: '5f41544fe0ec19692974cf94',
                name: 'Fake it till you make it',
                view: 'front',
                type: 'comparable',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                path: 'https://danskill-streaming-video-optimized.s3-eu-west-1.amazonaws.com/stars/paul_moldovan/Rumba/Level%2B3/Opening%2BOut/RUMBA_L3_OPENING_OUT_MY_LAB_PAUL.mp4',
                createdAt: '2020-08-22T17:22:23.419Z',
                updatedAt: '2020-08-22T18:35:45.313Z',
                __v: 0
            },
            {
                _id: '5f41549fe0ec19692974cf95',
                name: 'basic principles #1',
                view: 'front',
                type: 'basicPrinciples',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                path: 'https://danskill-streaming-video-optimized.s3-eu-west-1.amazonaws.com/stars/paul_moldovan/Rumba/Level%2B3/Opening%2BOut/RUMBA_L3_OPENING_OUT_BASIC_PRINCIPLE_PAUL.mp4',
                createdAt: '2020-08-22T17:23:43.666Z',
                updatedAt: '2020-08-22T17:23:43.666Z',
                __v: 0
            },

        ],
        _id: '5f4101a2f3f8fd3386e9dce0',
        type: 'tango',
        level: '1',
        name: 'Opening Out',
        logo: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
        createdAt: '2020-08-22T11:29:38.912Z',
        updatedAt: '2020-08-22T17:30:54.668Z',
        __v: 0

    },
    starVideo: {
        _id: '5f41544fe0ec19692974cf94',
        name: 'Fake it till you make it',
        view: 'front',
        type: 'comparable',
        participatesAmount: 'solo',
        associatedObject: {
            stars: [
                '5f40fe6ad1f6082d42e9708b'
            ],
            videos: [
                '5f4151336391ed647f4df9c1',
                '5f41544fe0ec19692974cf94',
                '5f41549fe0ec19692974cf95',
                '5f4154d0e0ec19692974cf96',
                '5f415565e0ec19692974cf97',
                '5f41564ee0ec19692974cf98'
            ],
            _id: '5f4101a2f3f8fd3386e9dce0',
            type: 'tango',
            level: '1',
            name: 'Opening Out',
            logo: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
            createdAt: '2020-08-22T11:29:38.912Z',
            updatedAt: '2020-08-22T17:30:54.668Z',
            __v: 0
        },
        thumbnail: 'https://www.arch2o.com/wp-content/uploads/2019/01/Arch2O-Dance-Portraits-Alexander-Yakovlev-01.jpg',
        ownerUser: '5f40fc75ac07bc255b09ea4e',
        ownerRole: 99,
        associatedModel: 'Figure',
        path: 'https://danskill-streaming-video-optimized.s3-eu-west-1.amazonaws.com/stars/paul_moldovan/Rumba/Level%2B3/Opening%2BOut/RUMBA_L3_OPENING_OUT_MY_LAB_PAUL.mp4',
        createdAt: '2020-08-22T17:22:23.419Z',
        updatedAt: '2020-08-22T18:35:45.313Z',
        __v: 0
    },
    userVideo: {
        name: 'user video',
        path: 'https://danskill-streaming-video-optimized.s3-eu-west-1.amazonaws.com/stars/paul_moldovan/Rumba/Level%2B3/Opening%2BOut/RUMBA_L3_OPENING_OUT_MY_LAB_USER.mp4'
    }
} */

export class LabState {
    labItem: LabItem | null;
    error: Error | string | null; // track errors
}

export const initializeLabState = () => {
    return { labItem: null, error: null };
};
