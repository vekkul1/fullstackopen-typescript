import type { CoursePart } from '../App';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const part = props.part;
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b>
            {part.name}: {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case 'group':
      return (
        <p>
          <b>
            {part.name}: {part.exerciseCount}
          </b>
          <br />
          group projects: {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <b>
            {part.name}: {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          background material: {part.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {part.name}: {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
