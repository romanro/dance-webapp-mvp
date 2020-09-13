import { AssociateType, Practice, VideoType } from '@core/models';



export const MOCK_PRACTICES: Array<Practice> = [
    {
        _id: '14564dsfds',
        associatedVideo: {
            _id: '5f4165814e55ab7cffd54cdc',
            name: 'fake it till you make it',
            associatedObject: '5f41544fe0ec19692974cf94',
            ownerUser: '5f40fc75ac07bc255b09ea4e',
            associatedModel: AssociateType.VIDEO,
            ownerRole: 0,
            path: 'https://danskill1.s3.amazonaws.com/users/Roy%20%28user%29%20-%20fake%20it%20till%20you%20make%20it.mp4_2020-08-22T18-35-28.314Z',
            type: VideoType.COMPARABLE,
            createdAt: '2020-08-22T18:35:45.301Z',
            updatedAt: '2020-08-22T18:35:45.301Z',
            __v: 0
        },
        createdAt: '2020-08-22T18:35:45.301Z',
        updatedAt: '2020-08-22T18:35:45.301Z',
        _v: 0

    },
    {
        _id: '14564dsfds45',
        associatedVideo: {
            _id: '5f4165814e55ab7cffd54cdc',
            name: 'fake it till you make it 55555555555',
            associatedObject: '5f41544fe0ec19692974cf94',
            ownerUser: '5f40fc75ac07bc255b09ea4e',
            associatedModel: AssociateType.VIDEO,
            ownerRole: 0,
            path: 'https://danskill1.s3.amazonaws.com/users/Roy%20%28user%29%20-%20fake%20it%20till%20you%20make%20it.mp4_2020-08-22T18-35-28.314Z',
            type: VideoType.COMPARABLE,
            createdAt: '2020-08-22T18:35:45.301Z',
            updatedAt: '2020-08-22T18:35:45.301Z',
            __v: 0
        },
        createdAt: '2020-07-22T18:35:45.301Z',
        updatedAt: '2020-07-22T18:35:45.301Z',
        _v: 0

    },


]


