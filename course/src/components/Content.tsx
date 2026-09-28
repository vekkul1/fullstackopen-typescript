import Part from './Part';

interface ContentProps {
  parts: Array<{ name: string; exerciseCount: number }>;
}

const Content = (props: ContentProps) => {
  return (
    <ul>
      {props.parts.map((part) => (
        <li key={part.name}>
          <Part part={part} />
        </li>
      ))}
    </ul>
  );
};

export default Content;
