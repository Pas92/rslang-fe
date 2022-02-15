export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userword?: Record<string, unknown>
};

export type UserWord = {
  difficulty: string;
  optional: UserWordCustomData;
};

export type UserWordCustomData = Record<string, unknown>;

export type Statistic = {
  learnedWords: string;
  optional: StatisticCustomData;
};

export type StatisticCustomData = Record<string, unknown>;

export type Setting = {
  learnedWords: string;
  optional: SettingCustomData;
};

export type SettingCustomData = Record<string, unknown>;


export type Auth = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type UserSingIn = {
  email: string
  password: string
}

export type UserReg = {
  name: string
  email: string
  password: string
}
