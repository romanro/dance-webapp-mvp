import { LabItem } from '@core/models/';

const MOCK_LAB = {
    star: {
        name: { firstName: 'Nina', lastName: 'Trump', nickname: 'Superstar' },
        location: { city: 'Tel-Aviv', country: 'Israel' },
        userPics: { smallPicURL: 'https://i.pinimg.com/originals/6b/7d/9f/6b7d9fd9d66a97db5abe4b7952aeeb87.png', largePicURL: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original' },
        figures: ['5ec15a57c6caf600666e40f1', '5ec15a94c6caf600666e40f2', '5ec2ad5b9899e90066b03d6d', '5eeb3409ed460b006630f548'],
        _id: '5ec1046b3ed6f9006670bba2', slug: 'nina-superstar-trump', birthDate: '1981-01-20T00:00:00.000Z',
        promoVideoURL: 'http://static.videogular.com/assets/videos/videogular.mp4',
        about: 'A dance teacher, has a good knowledge and about 20 years of experience. Born in Moscow, Russia.',
        createdAt: '2020-05-17T09:31:23.539Z', updatedAt: '2020-06-18T09:29:45.454Z', __v: 0
    },
    figure: {
        stars: ['5ec1046b3ed6f9006670bba2'],
        videos: [{
            _id: '5ee78e94b7ee0d006606eb1e', name: 'name', view: 'front', participatesAmount:
                'solo', associateWith: 'figure', type: 'comparable', associatedId: '5ec15a57c6caf600666e40f1',
            path: 'https://danskill.s3.eu-west-3.amazonaws.com/1592233584336_55555_4WatsApp+%281%29.mp4', coverURL: 'https://www.jamd.ac.il/sites/default/files/choreograpgy_unit_banner1_0.JPG', createdAt: '2020-06-15T15:07:00.710Z', updatedAt: '2020-06-15T15:07:00.710Z', __v: 0
        }, { _id: '5f0af68f0cc70900667b40f4', name: 'nametwo', view: 'back', participatesAmount: 'couple', associateWith: 'figure', type: 'basicPrinciples', associatedId: '5ec15a57c6caf600666e40f1', path: 'https://danskill.s3.eu-west-3.amazonaws.com/1594553971773_55555_4WatsApp+%281%29.mp4', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg', createdAt: '2020-07-12T11:39:59.118Z', updatedAt: '2020-07-12T11:39:59.118Z', __v: 0 }, { _id: '5f0af7050cc70900667b40f5', name: 'namethree', view: 'front', participatesAmount: 'couple', associateWith: 'figure', type: 'basicPrinciples', associatedId: '5ec15a57c6caf600666e40f1', path: 'https://danskill.s3.eu-west-3.amazonaws.com/1594554082197_55555_4WatsApp+%281%29.mp4', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg', createdAt: '2020-07-12T11:41:57.179Z', updatedAt: '2020-07-12T11:41:57.179Z', __v: 0 }, { _id: '5f0af75b0cc70900667b40f6', name: 'namefour', view: 'back', participatesAmount: 'couple', associateWith: 'figure', type: 'comparable', associatedId: '5ec15a57c6caf600666e40f1', path: 'https://danskill.s3.eu-west-3.amazonaws.com/1594554171016_55555_4WatsApp+%281%29.mp4', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg', createdAt: '2020-07-12T11:43:23.893Z', updatedAt: '2020-07-12T11:43:23.893Z', __v: 0 }], _id: '5ec15a57c6caf600666e40f1', name: 'Spin', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg', type: 'waltz', level: '1', createdAt: '2020-05-17T15:37:59.762Z', updatedAt: '2020-07-12T11:43:23.898Z', __v: 0
    },
    starVideo: {
        _id: '5ee78e94b7ee0d006606eb1e',
        name: 'name',
        view: 'front',
        participatesAmount: 'solo', associateWith: 'figure', type: 'comparable', associatedId: '5ec15a57c6caf600666e40f1', path: 'https://danskill.s3.eu-west-3.amazonaws.com/1592233584336_55555_4WatsApp+%281%29.mp4', coverURL: 'https://www.jamd.ac.il/sites/default/files/choreograpgy_unit_banner1_0.JPG', createdAt: '2020-06-15T15:07:00.710Z', updatedAt: '2020-06-15T15:07:00.710Z', __v: 0
    }
}

export class LabState {
    labItem: LabItem | null;
    error: Error | string | null; // track errors
}

export const initializeLabState = () => {
    return { labItem: MOCK_LAB, error: null };
};
