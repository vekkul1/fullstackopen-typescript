import type { DiaryEntry } from '../types';

interface EntryProps {
  obj: DiaryEntry;
}

const Entry = (props: EntryProps) => {
  const obj = props.obj;
  return (
    <div key={obj.id}>
      {obj.date}, Weather: {obj.weather}, Visibility {obj.visibility}
      <br />
      {!obj.comment && 'no comments'}
      {obj.comment && <i> {obj.comment}</i>}
    </div>
  );
};

export default Entry;
