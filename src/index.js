
import formValidation from './modules/validation.js';

// State
const state = {
  validate: false,
  collection: [],
  datas: {},
};

// Handler
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = e.currentTarget[0].value;
  formValidation(value, state);
  e.target.reset();
  e.currentTarget[0].focus();
});
