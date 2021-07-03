import cx from 'clsx';
import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import { AddButton, DeleteButton } from './Button';
import { useResume } from 'context';
import styles from './style.module.scss';
import { Fragment } from 'react';

export default function ContentGroup() {
  const {
    mainContent,
    addMainContent,
    addMainContentItem,
    deleteMainContent,
    deleteMainContentItem,
    updateMainTitle,
    updateMainItemTitle,
    updateMainItemContent,
    updateMainItemPeriod
  } = useResume();

  return (
    <ul className={styles.group}>
      <li className={styles.groupTitle}>Main Content</li>
      {mainContent.map(({ title, content }, index) => (
        <Fragment key={`edit-content-${index}`}>
          <li>
            <TextInput
              value={title}
              className={styles.titleInput}
              placeholder="title"
              onValueChange={(v) => updateMainTitle(index, v)}
            />
            <AddButton
              className={styles.titleAddButton}
              label=""
              onAdd={() => addMainContentItem(index)}
            />

            {!!index && (
              <DeleteButton onDelete={() => deleteMainContent(index)} />
            )}
            <ul className={styles.group}>
              {content.map(({ title, period, content }, itemIndex) => (
                <li
                  className={cx(styles.groupContent, styles.contentItem)}
                  key={`edit-content-${index}-${itemIndex}`}
                >
                  <TextInput
                    value={title}
                    placeholder="title"
                    onValueChange={(v) =>
                      updateMainItemTitle(index, itemIndex, v)
                    }
                  />
                  <TextInput
                    value={period}
                    placeholder="period"
                    onValueChange={(v) =>
                      updateMainItemPeriod(index, itemIndex, v)
                    }
                  />
                  <TextArea
                    value={content}
                    placeholder="content"
                    stretch
                    onValueChange={(v) =>
                      updateMainItemContent(index, itemIndex, v)
                    }
                  />
                  {!!itemIndex && (
                    <DeleteButton
                      onDelete={() => deleteMainContentItem(index, itemIndex)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </li>
        </Fragment>
      ))}
      <AddButton label="content" onAdd={addMainContent} />
    </ul>
  );
}
