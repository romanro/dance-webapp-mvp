import { Language } from '@app/_infra/core/models';
import { AgeGroup, Gender, User, UserPermissions } from '@models/user.model';

export const MOCK_USER: User = {
    email: 'used@moack.com',
    name: {
        firstName: 'Oleg',
        lastName: 'Popov',
        nickname: 'Der Klawn'
    },
    language: Language.english,
    gender: Gender.MALE,
    permissions: [UserPermissions.USER],
    location: {
        city: 'Tel-Aviv',
        country: 'Israel'
    },
    birthDate: {
        date: { year: 2006, month: 2, day: 22 },
        group: AgeGroup.YOUNG
    },
    tags: [
        { id: '1', text: 'salsa' },
        { id: '2', text: 'classic' }
    ],
    userPic: 'https://i.pinimg.com/originals/6b/7d/9f/6b7d9fd9d66a97db5abe4b7952aeeb87.png',
    about: '200 char max long info'
};
