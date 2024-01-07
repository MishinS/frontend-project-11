import  './styles.scss';
import  'bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import observers from './observers.js';

console.log('Hellow, World!')

// State
const state = {
  validate: false,
};

// Get data with axios
const getData = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
console.log(getData('https://lorem-rss.hexlet.app/feed'));

// Validation with yup
const schemaStr = yup.object({
  rss: yup.string().required().url().trim(),
});
let collection = [];

const form = document.querySelector('form');
const input = document.querySelector('input');
const pM = document.getElementById('1');
const p = document.createElement('p');

// Handler implementation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = document.querySelector('form')[0].value;

  if (!collection.includes(value)) {
    const validate = schemaStr
      .validate({ rss: `${value}` })
      .then((url) => {
        collection.push(url.rss);

        console.log(collection);
        input.className = 'form-control w-100 is-valid';
        p.textContent = 'RSS link is correct';
        pM.append(p);
        p.setAttribute(
          'class',
          'feedback m-0 position-absolute small text-success',
        );
        state.validate = true;
      })
      .catch((err) => {
        input.className = 'form-control is-invalid';
        p.textContent = `${err.errors}`;
        p.setAttribute(
          'class',
          'feedback m-0 position-absolute small text-danger',
        );
        pM.append(p);
        state.validate = false;
      });
  }
  if (state.validate === true) {
    const chemaMix = yup.mixed().notOneOf(collection);
    chemaMix
      .isValid(value)
      .then((data) => {
        if (data === true) {
          console.log(data);
          input.className = 'form-control w-100 is-valid';
          p.textContent = 'This RSS link is new';
          pM.append(p);
          p.setAttribute(
            'class',
            'feedback m-0 position-absolute small text-success',
          );
        } else {
          console.log(data);
          input.className = 'form-control is-invalid';
          p.textContent = 'This link was added';
          p.setAttribute(
            'class',
            'feedback m-0 position-absolute small text-danger',
          );
          pM.append(p);
          state.validate = false;
        }
      });
  }
  console.log(observers(state));
  document.querySelector('form').reset();
  input.focus();
});

