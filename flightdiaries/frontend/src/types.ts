export interface DiaryEntry {
  weather: string;
  visibility: string;
  date: string;
  comment?: string;
  id: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
