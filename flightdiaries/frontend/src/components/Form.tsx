import { useState, type SyntheticEvent } from 'react';
import { isAxiosError } from 'axios';
import type { NewDiaryEntry } from '../types';

interface FormProps {
  createEntry: (entry: NewDiaryEntry) => Promise<void>;
}

const Form = (props: FormProps) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setError] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };
    props
      .createEntry(newEntry)
      .then(() => {
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          const foundError = error.response.data.error;
          const errors = [];
          for (const i in foundError) {
            // console.log(foundError[i].path[0]);
            const j = foundError[i].path[0];
            errors.push('Error: Incorrect ' + j + ' : ' + newEntry[j]);
          }
          setError(errors.join(', '));
          setTimeout(() => {
            setError('');
          }, 5000);
        } else {
          console.log(error);
        }
      });
  };
  //   Sunny: 'sunny',
  // Rainy: 'rainy',
  // Cloudy: 'cloudy',
  // Stormy: 'stormy',
  // Windy: 'windy',
  //
  //   Great: 'great',
  // Good: 'good',
  // Ok: 'ok',
  // Poor: 'poor',

  return (
    <>
      <h2>Add New Entry:</h2>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
            type='radio'
            name='weather'
            value='sunny'
            onChange={(e) => setWeather(e.target.value)}
          />{' '}
          Sunny
          <input
            type='radio'
            name='weather'
            value='rainy'
            onChange={(e) => setWeather(e.target.value)}
          />{' '}
          Rainy
          <input
            type='radio'
            name='weather'
            value='cloudy'
            onChange={(e) => setWeather(e.target.value)}
          />{' '}
          Cloudy
          <input
            type='radio'
            name='weather'
            value='stormy'
            onChange={(e) => setWeather(e.target.value)}
          />{' '}
          Stormy
          <input
            type='radio'
            name='weather'
            value='windy'
            onChange={(e) => setWeather(e.target.value)}
          />{' '}
          Windy
        </label>
        <br />
        <label htmlFor='visibility'>
          Visibility: <br />
          <input
            type='radio'
            name='visibility'
            value='great'
            onChange={(e) => setVisibility(e.target.value)}
          />{' '}
          Great
          <input
            type='radio'
            name='visibility'
            value='good'
            onChange={(e) => setVisibility(e.target.value)}
          />{' '}
          Good
          <input
            type='radio'
            name='visibility'
            value='ok'
            onChange={(e) => setVisibility(e.target.value)}
          />{' '}
          Ok
          <input
            type='radio'
            name='visibility'
            value='poor'
            onChange={(e) => setVisibility(e.target.value)}
          />{' '}
          Poor
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
