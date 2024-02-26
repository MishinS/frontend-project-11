import * as yup from 'yup';
import observers from './observers.js';
import getData from './data.js';

import render from './render.js';

// Create validation schema

const formValidation = (currentValue, state) => {
  const validation = (link, collect) => {
    const schemaStr = yup.string().required().url().trim();
    const schemaMix = yup.mixed().notOneOf(collect);
    return schemaStr.validate(link)
      .then((url) => schemaMix.validate(url));
  };

  const currentCollection = state.collection;
  const watcher = observers(state);
  validation(currentValue, currentCollection)
    .then((currentLink) => {
      watcher.collection.push(currentLink);
      watcher.validate = true;
      const newDatas = getData(currentLink, state);
      newDatas.then((currentData) => {
        render(currentLink, currentData, state);
      });
    })
    .catch((err) => {
      watcher.validate = false;
      render(err);
    });
};

export default formValidation;
