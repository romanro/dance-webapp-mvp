import { Language } from '@app/_infra/core/models';
import { AgeGroup, Gender, User, UserPermissions } from '@models/user.model';

export const MOCK_USER: User = {
    id: '2342stam',
    email: 'used@moack.com',
    profile: {
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
        // tslint:disable-next-line:max-line-length
        picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAflBMVEX///+1tbWqq62nqKqlpqiurq64uLiwsLCjpKaysrKrrK79/f2hoqSfoKKdnqCVlpiZmpytra2bnJ67u7uXmJq8vb2Sk5X7+/v39/fz8/PDw8TIyMj5+fnLy8zS0tLZ2drn5+fAwMDd3d3v7/Dr6+vV1dXh4eHPz8+wsbPj4+QX4ZumAAAD5klEQVRYw93X23aqMBAGYIiC6LjbIqWcz6Dt+7/gjkmWcTOmZsCr/fdw0a71remfgYLz/wbUF/+epFmWvMwF/pkkAFlTdFHk+27cl/xnr5i4HLnZ5UV9iX2VbgRYDSfj1MVxJOLf4vpNsq4JSPsivmYu89SwYnAOX3LOzmVXplkqX8+uHGrDzCJDknCdPjvwnDsJ38sul1W6PI6Lcwn0scspNsyssufZ7aOWbCcXBZtlYe/iBIhy/WBmF8s8LbHu3tAGlncVhQZIuweyi2QRl3SS0Dxsw8cyT9WSpq7vZaU/ntnzipQ0dY3aMMk8tOuyiiPUs6/gueztS8rUxXzmG8w/pKzpMKPQuW0bdLqz2ToFh8SpDW0geQnt27axgtbuozZEUgpdoDbMM4deSdpryzZEdgmFrjFsaoOxPYmeTDPP6MPhwJhLoMFpLNrgrJBZTLqHnC3akDBPTqGh1TSS5/SmcCj04D7fDSnz1KSp099PMBQyk9k0QHhw6jvcBj5BJW+8PANr2cUzm2WeyPZZJMmRjHZDyyKjJZ1GT+4bc3m7tawbMt9yNzQ9ORTaLIfzmbdBTZja6gSVzFMTp8ayOkAkI9p8jPcyprEc9Nb/vgi7ITPY0uf9wzZ4HstBZH2pl/Hjex2WFW3/9A6ta7Mbyt0GBeUpuFeubsMoB0Fckt7s2qKItYx2Q9O5P4l7E0mfLHYj2JfCJdqj9+9uMCzzmh2g207i3tG4Db0b9ECNdkPR+gQ9AdPpbKdrRm1IunaW0VD8eoI8LHUW2sNO9GyUjzUsnRounnk3eL5TTVOT+qY2RM7O8sAYMrx1Sj5WsIaGxthGgB4+qHhuamObOStTIVrKx03yElrDmt6up1Ebr6TxzEeel9BIXk0DXL9VG4baOEoagP9+Ge0AT4GLPmoalo5djlPMcBsyf7zinMGSIsqhyb/xbmj5muC7+klB/oV2dJL1hXvYMC4jWsEybzxb/zKWoryncvpT+SFjB/ZUflM5nQJ/GkwyXONA2taRx/BdVMuYPol8fARdM4CkZjRnp25vfmIUMcGc5vn82OT9ML8fJm2+90L0NmFuQ9NKFvbn5/sHu6T3I5cVfmKUsWvjJl/x920LNzrJTe+DT9vAMs9pvNGNJ2mKjGfW9DtLFF266H0QwVp+0obIV6/W5EfJ4QtmVnEVXYV6ZizLYPlNy2jo91Mqq469HWd10YQrBcPKHoWc7j3DmyaxDS1/fTXqgZS7Fm0gGreh6UrQA0M0kkltXJOLO22L4HVtiERXGn7YrzKiTzIGWMV1eATNEE27UhD9Lfb6zF7ahqIdSWM5UDHOjGEla/ovFC6qRWaHIA4AAAAASUVORK5CYII=',
        about: '200 char max long info'
    }

};
