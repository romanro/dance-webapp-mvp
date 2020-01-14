import { FigureType, StarSkill, ViewDirection } from '@core/models';

export const MOCK_STAR_SKILLS: Array<StarSkill> = [
    {
        id: '1',
        starBasicInfo: {
            id: '1',
            name: {
                firstName: 'Nina',
                lastName: 'Trump',
                nickname: 'Superstar'
            }, userPics: {
                smallPicURL: 'https://i.pinimg.com/originals/6b/7d/9f/6b7d9fd9d66a97db5abe4b7952aeeb87.png',
                largePicURL: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original'
            }
        },
        figure: {
            id: '1',
            level: 0,
            type: FigureType.STEP,
            name: 'Super Nina step'
        },
        skillVideo: {
            id: '1',
            views: [
                {
                    id: '1',
                    direction: ViewDirection.FRONT,
                    videoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4'
                }, {
                    id: '2',
                    direction: ViewDirection.BACK,
                    videoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4'
                }
            ],
            soundTrackUrl: ''
        },
        videoCoverUrl: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original',
        videoPreviewUrl: 'http://static.videogular.com/assets/videos/videogular.mp4'
    },
    {
        id: '2',
        starBasicInfo: {
            id: '1',
            name: {
                firstName: 'Nina',
                lastName: 'Trump',
                nickname: 'Superstar'
            }, userPics: {
                smallPicURL: 'https://i.pinimg.com/originals/6b/7d/9f/6b7d9fd9d66a97db5abe4b7952aeeb87.png',
                largePicURL: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original'
            }
        },
        figure: {
            id: '1',
            level: 0,
            type: FigureType.MOVE,
            name: 'Super Nina Move!'
        },
        skillVideo: {
            id: '2',
            views: [
                {
                    id: '3',
                    direction: ViewDirection.RIGHT,
                    videoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4'
                }, {
                    id: '4',
                    direction: ViewDirection.BACK,
                    videoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4'
                }
            ],
            soundTrackUrl: ''
        },
        videoCoverUrl: 'https://media.vogue.co.uk/photos/5d54be0919b6dd000853ad13/master/pass/original',
        videoPreviewUrl: 'http://static.videogular.com/assets/videos/videogular.mp4'
    }
];
