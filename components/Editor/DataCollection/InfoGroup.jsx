import TextInput from 'components/TextInput';
import { AddButton, DeleteButton } from './Button';
import { useResume } from 'context';
import styles from './style.module.scss';

export default function InfoGroup() {
  const { info, updateInfoTitle, updateInfoContent, addInfo, deleteInfo } =
    useResume();
  const [email, ...others] = info;

  return (
    <ul className={styles.group}>
      <li className={styles.groupTitle}>Info</li>
      <li className={styles.groupContent}>
        <TextInput
          label="email"
          value={email[1]}
          placeholder="type content..."
          onValueChange={(v) => updateInfoContent(0, v)}
        />
      </li>

      {others.map(([title, content], index) => (
        <li className={styles.groupContent} key={`edit-${index + 1}`}>
          <TextInput
            value={title}
            className={styles.infoTitle}
            placeholder="title"
            onValueChange={(v) => updateInfoTitle(index + 1, v)}
          />
          <TextInput
            value={content}
            className={styles.infoContent}
            placeholder="content"
            onValueChange={(v) => updateInfoContent(index + 1, v)}
          />
          <DeleteButton onDelete={() => deleteInfo(index + 1)} />
        </li>
      ))}
      <AddButton onAdd={addInfo} label="Info" />
    </ul>
  );
}
