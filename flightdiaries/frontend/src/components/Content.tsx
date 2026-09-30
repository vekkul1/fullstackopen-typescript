import type { DiaryEntry } from '../types';
import Entry from './Entry';

interface ContentProps {
  diaries: DiaryEntry[];
}

const Content = (props: ContentProps) => {
  return (
    <ul>
      {props.diaries.map((diary: DiaryEntry) => (
        <div key={diary.id}>
          <Entry obj={diary} />
          <hr />
        </div>
      ))}
    </ul>
  );
};

export default Content;
