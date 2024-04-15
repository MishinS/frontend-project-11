/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import axios from 'axios';
import _ from 'lodash';

// Get data with axios

const createProxyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
  url,
)}`;

const request = (url) => axios
  .get(createProxyUrl(url))
  .then((response) => response)
  .catch((error) => {
    const networkErrors = {};

    if (error.response) {
      networkErrors.url = 'errors.network.invalidStatus';
    } else {
      networkErrors.url = 'errors.network.invalidResponse';
    }

    const newError = new Error();
    newError.errors = networkErrors;

    throw newError;
  });

const getData = (link) => request(link).then((rssData) => {
  const data = {};
  const postss = [];
  const feedss = [];
  const xmlDocument = new DOMParser().parseFromString(
    rssData.data.contents,
    'text/xml',
  );
  const items = xmlDocument.querySelectorAll('item');
  const rsss = xmlDocument.querySelectorAll('rss');
  const itemsArr = [...items];
  const rssArr = [...rsss];

  itemsArr.map((item) => {
    const title = item.querySelector('title');
    const link = item.querySelector('link');
    const desc = item.querySelector('description');
    postss.push({
      id: `${_.uniqueId()}`,
      post: `${title.textContent}`,
      link: `${link.textContent}`,
      description: `${desc.textContent}`,
    });
    data.posts = postss;
  });
  rssArr.map((rss) => {
    const titleM = rss.querySelector('title');
    const description = rss.querySelector('description');
    const link = rss.querySelector('link');
    feedss.push({
      feed: `${titleM.textContent}`,
      description: `${description.textContent}`,
      link: `${link.textContent}`,

    });
    data.feeds = feedss;
  });
  if (feedss.length === 0) {
    return null;
  }
  return data;
}).catch((error) => {
  error.errors;

  throw error;
});

export default getData;
