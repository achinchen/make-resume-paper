const isString = (value) => typeof value === 'string';

export default function validation(data) {
  if (!data.name || !data.info || !data.mainContent) return false;

  try {
    const { name, info, mainContent } = data;

    for (let lang in name) {
      if (!isString(lang)) return false;
    }

    for (let [title, content] of info) {
      if (!isString(title) || !isString(content)) return false;
    }

    for (let { title, content } of mainContent) {
      if (!isString(title)) return false;
      if (!Array.isArray(content)) return false;

      const invalidContent = content.filter(({ title, period, content }) => {
        if (!isString(title) || !isString(content) || !isString(period))
          return false;
      });

      if (invalidContent.length) return false;
    }

    return true;
  } catch {
    return false;
  }
}
