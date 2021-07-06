import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import PropTypes from 'prop-types';
import {
  CACHE_KEY,
  PLACEHOLDER,
  getSampleContent,
  getContentPlaceholder
} from './constants';
import validation from './validation';

const initialState = {
  name: PLACEHOLDER.name,
  info: [PLACEHOLDER.info],
  mainContent: getSampleContent(),
  updateName: () => {},
  updateInfoTitle: () => {},
  updateInfoContent: () => {},
  addInfo: () => {},
  deleteInfo: () => {},
  addMainContent: () => {},
  addMainContentItem: () => {},
  deleteMainContent: () => {},
  deleteMainContentItem: () => {},
  updateMainTitle: () => {},
  updateMainItemTitle: () => {},
  updateMainItemContent: () => {},
  updateMainItemPeriod: () => {},
  setupResume: () => {}
};

export const ResumeContext = createContext(initialState);
ResumeContext.displayName = 'ResumeContext';

const infoReducer = (state, { index, payload, type }) => {
  switch (type) {
    case 'ADD':
      return [...state, ['', '']];
    case 'UPDATE_TITLE':
      state[index][0] = payload;
      return [...state];
    case 'UPDATE_CONTENT':
      state[index][1] = payload;
      return [...state];
    case 'DELETE':
      state.splice(index, 1);
      return [...state];
    case 'SETUP':
      return payload;
    default:
      break;
  }
};

const mainContentReducer = (state, { type, index, itemIndex, payload }) => {
  switch (type) {
    case 'ADD':
      return [...state, getContentPlaceholder()];
    case 'ADD_ITEM':
      state[index].content.push({ ...PLACEHOLDER.mainContent.content });
      return [...state];
    case 'UPDATE_TITLE':
      state[index].title = payload;
      return [...state];
    case 'UPDATE_ITEM_TITLE':
      state[index].content[itemIndex].title = payload;
      return [...state];
    case 'UPDATE_ITEM_CONTENT':
      state[index].content[itemIndex].content = payload;
      return [...state];
    case 'UPDATE_ITEM_PERIOD':
      state[index].content[itemIndex].period = payload;
      return [...state];
    case 'DELETE':
      state.splice(index, 1);
      return [...state];
    case 'DELETE_ITEM':
      state[index].content.splice(itemIndex, 1);
      return [...state];
    case 'SETUP':
      return payload;
    default:
      break;
  }
};

export const ResumeProvider = ({ children }) => {
  const [name, setName] = useState(initialState.name);
  const [info, dispatchInfo] = useReducer(infoReducer, initialState.info);
  const [mainContent, dispatchContent] = useReducer(
    mainContentReducer,
    initialState.mainContent
  );

  const updateName = (key, value) =>
    setName((name) => ({ ...name, [key]: value }));

  const updateInfoTitle = (index, payload) =>
    dispatchInfo({
      index,
      payload,
      type: 'UPDATE_TITLE'
    });

  const updateInfoContent = (index, payload) =>
    dispatchInfo({
      index,
      payload,
      type: 'UPDATE_CONTENT'
    });

  const addInfo = () =>
    dispatchInfo({
      type: 'ADD'
    });

  const deleteInfo = (index) => {
    dispatchInfo({
      index,
      type: 'DELETE'
    });
  };

  const addMainContent = () => dispatchContent({ type: 'ADD' });
  const addMainContentItem = (index) =>
    dispatchContent({ type: 'ADD_ITEM', index });

  const updateMainTitle = (index, payload) =>
    dispatchContent({ type: 'UPDATE_TITLE', index, payload });
  const updateMainItemTitle = (index, itemIndex, payload) =>
    dispatchContent({
      type: 'UPDATE_ITEM_TITLE',
      index,
      itemIndex,
      payload
    });
  const updateMainItemContent = (index, itemIndex, payload) =>
    dispatchContent({
      type: 'UPDATE_ITEM_CONTENT',
      index,
      itemIndex,
      payload
    });
  const updateMainItemPeriod = (index, itemIndex, payload) =>
    dispatchContent({
      type: 'UPDATE_ITEM_PERIOD',
      index,
      itemIndex,
      payload
    });

  const deleteMainContent = (index) =>
    dispatchContent({ type: 'DELETE', index });
  const deleteMainContentItem = (index, itemIndex) =>
    dispatchContent({ type: 'DELETE_ITEM', index, itemIndex });

  const setupResume = (json) => {
    const data = JSON.parse(json);
    const isValid = validation(data);
    if (isValid) {
      const { name, info, mainContent } = data;
      setName(name);
      dispatchInfo({ type: 'SETUP', payload: info });
      dispatchContent({ type: 'SETUP', payload: mainContent });
    }
  };

  useEffect(() => {
    let resume = window.localStorage.getItem(CACHE_KEY);
    if (resume) setupResume(resume);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        name,
        info,
        mainContent,
        updateName,
        updateInfoTitle,
        updateInfoContent,
        deleteInfo,
        addInfo,
        addMainContent,
        addMainContentItem,
        deleteMainContent,
        deleteMainContentItem,
        updateMainTitle,
        updateMainItemTitle,
        updateMainItemContent,
        updateMainItemPeriod,
        setupResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
ResumeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error(
      'The userResume hook must be used within a ResumeContext.Provider'
    );
  }
  return context;
}

let id;

export function useSaveStorage() {
  const { name, info, mainContent } = useResume();

  useEffect(() => {
    clearTimeout(id);
    id = setTimeout(() => {
      window.localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ name, info, mainContent })
      );
    }, 3000);
  }, [name, info, mainContent]);
}
