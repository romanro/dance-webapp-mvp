export enum EnumDanceType {
    waltz = "waltz",
    tango = "tango",
    quickstep = "quickstep",
    foxtrot = "foxtrot"
}
export const possibleDanceTypes = Object.values(EnumDanceType);

export enum EnumDanceLevel {
    one = "one",
    two = "two",
    three = "three",
    four = "four"
}
export const possibleDanceLevels = Object.values(EnumDanceLevel);

export enum EnumGender {
    MALE = 'male',
    FEMALE = 'female'
  }
export const possibleGenders = Object.values(EnumGender);
  
  export enum EnumAgeGroup {
    CHILD = 'child',
    YOUNG = 'young',
    ADULT = 'adult'
  }

  export enum EnumLanguage {
    english = 'en'
  }
export const possibleLanguages = Object.values(EnumLanguage);


export enum EnumView {
  front = 'front',
  back = 'back'
}
export const possibleViews = Object.values(EnumView);

export enum EnumParticipatesAmount {
  solo = 1,
  couple = 2
}
export const possibleParticipatesAmounts = Object.values(EnumParticipatesAmount);

export enum EnumAssociateTo {
  user = "user",
  figure = "figure"
}
export const possibleAssociateTo = Object.values(EnumAssociateTo);