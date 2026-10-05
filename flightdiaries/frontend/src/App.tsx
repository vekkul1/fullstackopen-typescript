import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';
import entryService from './services/entries';
import Content from './components/Content';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    entryService.getAll().then((d) => {
      setDiaries(d);
    });
  }, []);

  const handleCreate = async (entry: NewDiaryEntry): Promise<void> => {
    const response = await entryService.create(entry);
    setDiaries(diaries.concat(response));
  };

  return (
    <>
      <Header title={'Flight Diaries'} />
      <Form createEntry={handleCreate} />
      <Content diaries={diaries} />
    </>
  );
}

export default App;
