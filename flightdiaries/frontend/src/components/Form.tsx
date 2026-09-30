import { useState, type SyntheticEvent } from 'react';
import type { NewDiaryEntry } from '../types';

interface FormProps {
  createEntry: (entry: NewDiaryEntry) => void;
}

const Form = (props: FormProps) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };
    props.createEntry(newEntry);
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };
  return (
    <>
      <h2>Add New Entry:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='date'>
          Date: <br />
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor='weather'>
          Weather: <br />
          <input
            type='text'
            name='weather'
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor='visibility'>
          Visibility: <br />
          <input
            type='text'
            name='visibility'
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor='comment'>
          Comment: <br />
          <textarea
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Form;
