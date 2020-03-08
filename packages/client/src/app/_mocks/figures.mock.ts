import { Exercise, Figure, Level } from '@app/_infra/core/models';

export const MOCK_EXERCISE: Exercise = {
    id: '34',
    name: 'Legs warming',
    coverImageUrl: 'https://media.gettyimages.com/photos/woman-wearing-stripey-legwarmers-sitting-on-exercise-ball-picture-id112301497?s=612x612',
    videoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4',
    description: 'Its a good'
};


export const MOCK_FIGURES: Array<Figure> = [
    {
        id: '1',
        starId: '2',
        name: 'Super Figure',
        coverImageUrl: 'https://i.ytimg.com/vi/C2rss1AO1Tw/hqdefault.jpg',
        classVideoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4',
        isAdvanced: false,
        levels: [
            {
                id: '11',
                level: Level.Beginner,
                coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfp4AOINkn5kWbdcMkqSJMke5eAopDOdvY1C70bmLBIt5hZO8&s',
                videos: []
            },
            {
                id: '22',
                level: Level.Intermediate,
                coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfp4AOINkn5kWbdcMkqSJMke5eAopDOdvY1C70bmLBIt5hZO8&s',
                videos: []
            }
        ],
        description: 'Very very simple valse step',
        exercises: [MOCK_EXERCISE],
        suggestion: 'Use yor own force',
        relatedFigures: []
    },
    {
        id: '2',
        starId: '2',
        name: 'Super Partners Figure',
        coverImageUrl: 'https://i.ytimg.com/vi/C2rss1AO1Tw/hqdefault.jpg',
        classVideoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4',
        isAdvanced: false,
        levels: [
            {
                id: '112',
                level: Level.Beginner,
                coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfp4AOINkn5kWbdcMkqSJMke5eAopDOdvY1C70bmLBIt5hZO8&s',
                videos: []
            },
            {
                id: '222',
                level: Level.Advanced,
                coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfp4AOINkn5kWbdcMkqSJMke5eAopDOdvY1C70bmLBIt5hZO8&s',
                videos: []
            }
        ],
        description: 'Very very simple valse step',
        exercises: [MOCK_EXERCISE],
        suggestion: 'Use yor own force',
        relatedFigures: []
    },
    {
        id: '3',
        starId: '2',
        name: 'Super Partners Figure 2',
        coverImageUrl: 'https://i.ytimg.com/vi/C2rss1AO1Tw/hqdefault.jpg',
        classVideoUrl: 'http://static.videogular.com/assets/videos/videogular.mp4',
        isAdvanced: true,
        levels: [
            {
                id: '1124',
                level: Level.Beginner,
                coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfp4AOINkn5kWbdcMkqSJMke5eAopDOdvY1C70bmLBIt5hZO8&s',
                videos: []
            },
            {
                id: '2224',
                level: Level.Advanced,
                coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfp4AOINkn5kWbdcMkqSJMke5eAopDOdvY1C70bmLBIt5hZO8&s',
                videos: []
            }
        ],
        description: 'Very  cool valse step',
        exercises: [MOCK_EXERCISE],
        suggestion: 'Use yor own force',
        relatedFigures: []
    }
];
