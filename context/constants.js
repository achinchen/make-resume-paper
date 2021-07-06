import { clone } from 'utils/index';

export const CACHE_KEY = '__resume_paper_cache';

export const PLACEHOLDER = {
  name: {
    mandarin: '王小明',
    english: 'Ming, Wang'
  },
  info: ['email', 'example@example.com'],
  mainContent: {
    content: {
      title: '',
      content: '',
      period: ''
    }
  }
};

export const getContentPlaceholder = () =>
  clone({ title: '', content: [PLACEHOLDER.mainContent.content] });

export const getSampleContent = () =>
  clone([
    {
      title: 'experience',
      content: [
        {
          title: 'Frontend Dev at Example Inc.',
          period: 'May, 2019 - May, 2021',
          content: `- Frontend performance and a11y enhancement:
Implement core image component with lazyload and dynamic resize service, reducing server traffic, increasing performance, and optimizing page loading speed.
- Vital features refactoring e.g. RecipeEditor, Dish ...etc.:
Switch JavaScript to TypeScript, fix bug issues, and rewrite unit tests to ensure smooth critical using path.
- Data tracking mechanism:
Deal with third-party cookie privacy issue, migrating GTM Server-side tagging and connecting Facebook Conversion API.
- Campaign API and Database design:
Provide campaign information and api for product usage. (e.g. https://example.com)`
        }
      ]
    },
    {
      title: 'education',
      content: [
        {
          title: 'Bachelor in CS at ABC University',
          period: '2012 - 2016',
          content: 'President Award'
        }
      ]
    }
  ]);
