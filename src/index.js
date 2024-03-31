import valid from './modules/validation.js'
import localizationData from './modules/translation.js';

// State
const state = {
  validate: false,
  subvalidate: false,
  clicked: [],
  datas: {
    feeds: [],
    posts: [],
  },
  collection: [],
  localization: localizationData,
};

// Handler
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = e.currentTarget[0].value;
  valid(value, state)
  e.target.reset();
  e.currentTarget[0].focus();
});

