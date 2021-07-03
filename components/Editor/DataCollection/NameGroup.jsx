import TextInput from 'components/TextInput';
import { useResume } from 'context';
import styles from './style.module.scss';

export default function NameGroup() {
  const { name, updateName } = useResume();

  return (
    <ul className={styles.group}>
      <li className={styles.groupTitle}>Name</li>
      {Object.entries(name).map(([title, content], index) => (
        <li className={styles.groupContent} key={`Name-${index}`}>
          <TextInput
            label={title}
            value={content}
            placeholder="type content..."
            onValueChange={(v) => updateName(title, v)}
          />
        </li>
      ))}
    </ul>
  );
}
