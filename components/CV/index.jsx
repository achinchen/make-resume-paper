import React from 'react';
import styles from './style.module.scss';

const markedContent = (content) => {
  try {
    const marked = content
      .split('- ')
      .filter((v) => v)
      .map((i) => i.replace(/\n$/, ''));
    return marked.length ? marked : content;
  } catch (e) {
    return content;
  }
};

export default function CV({ name, info, mainContent }) {
  return (
    <div className={styles.cv}>
      <header className={styles.instruction}>
        <h1 className={styles.instructionName}>
          {name.mandarin} / {name.english}
        </h1>
        {info.map(([title, content], index) => (
          <a
            className={styles.instructionContact}
            key={`cv-${index}`}
            href={title === 'email' ? `mailto:${content}` : content}
          >
            {content}
          </a>
        ))}
      </header>
      <main>
        {mainContent.map(({ title, content }, index) => (
          <section className={styles.section} key={`content-${index}`}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <ul className={styles.sectionContent}>
              {content.map(({ title, period, content }, itemIndex) => (
                <li
                  className={styles.sectionContentItem}
                  key={`content-${index}-${itemIndex}`}
                >
                  <h3 className={styles.sectionContentItemTitle}>{title}</h3>
                  {period}
                  {content.includes('- ') ? (
                    <ul className={styles.sectionContentItemProjects}>
                      {markedContent(content).map((content, nestedIndex) => (
                        <li
                          key={`content-${index}-${itemIndex}-${nestedIndex}`}
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      ))}
                    </ul>
                  ) : (
                    <div>{content}</div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <footer className={styles.copyright}>
        {name.english} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
