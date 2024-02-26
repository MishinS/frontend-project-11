import axios from 'axios';

const createProxyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url, )}`;

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

const getData = (url, currentState) => {
  const posts = [];
  const feeds = [];
  return request(url).then((s) => {
    const xmlDocument = new DOMParser().parseFromString(s.data.contents, 'text/xml');
    const items = xmlDocument.querySelectorAll('item');
    const rsss = xmlDocument.querySelectorAll('rss');

    const elementsItems = [...items];
    const elementsRss = [...rsss];
    elementsItems.map((item) => {
      const title = item.querySelector('title');
      const link = item.querySelector('link');
      const desc = item.querySelector('description');
      posts.push({ post: `${title.textContent}`, link: `${link.textContent}`, description: `${desc.textContent}` });
      (currentState.datas).posts = posts;
    });
    elementsRss.map((rss) => {
      const title = rss.querySelector('title');
      const description = rss.querySelector('description');
      feeds.push({ feed: `${title.textContent}`, description: `${description.textContent}` });
      (currentState.datas).feeds = feeds;
    });
    return currentState.datas;
  });
};

export default getData;
