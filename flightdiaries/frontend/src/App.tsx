import { useEffect, useState } from 'react';
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

  const handleCreate = (entry: NewDiaryEntry) => {
    try {
      entryService.create(entry).then((d) => {
        setDiaries([...diaries, d]);
      });
    } catch (error) {
      console.log(error);
    }
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
