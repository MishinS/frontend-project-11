import i18next from 'i18next';
import data from './translation.js';

// Set i18next
const newI = i18next.createInstance();
newI.init({
  lng: 'en',
  debug: true,
  resources: data.data.resources,
});

const MsgRu = data.data.resources.ru.translation;
const MsgEn = data.data.resources.en.translation;

// Render info msgs & input border style
const render = (val, dataUrl, state = { validate: false }) => {
  const input = document.querySelector('input');
  const divExample = document.getElementById('1');
  const pMsg = document.getElementById('msg');

  const checkCreatedElement = document.getElementById('msg');
  if (checkCreatedElement === null) {
    divExample.append(pMsg);
  }

  if (state.validate === true) {
    // Render validate msg
    input.className = 'form-control w-100 is-valid';
    pMsg.className = 'feedback m-0 position-absolute small text-success';

    MsgRu.code3 = 'Ссылка успешно добавлена';
    MsgEn.code3 = 'Link was success added';
    const successMsg = newI.t('code3');
    pMsg.textContent = successMsg;

    // Render data from value

    const postsEl = document.querySelector('.posts');
    const feedsEl = document.querySelector('.feeds');

    const divCardsP = document.createElement('div');
    divCardsP.setAttribute('class', 'card border-0');

    const divCardsF = document.createElement('div');
    divCardsF.setAttribute('class', 'card border-0');

    const divCardBodyP = document.createElement('div');
    divCardBodyP.setAttribute('class', 'card-body');

    const divCardBodyF = document.createElement('div');
    divCardBodyF.setAttribute('class', 'card-body');

    const titlePosts = document.createElement('h2');
    titlePosts.setAttribute('class', 'card-title h4');

    const titleFeels = document.createElement('h2');
    titleFeels.setAttribute('class', 'card-title h4');

    const ulP = document.createElement('ul');
    ulP.setAttribute('class', 'list-group border-0 rounded-0');

    const ulF = document.createElement('ul');
    ulF.setAttribute('class', 'list-group border-0 rounded-0');

    const bodyModal = document.querySelector('.modal-body');
    dataUrl.posts.map((post) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
      const a = document.createElement('a');
      a.setAttribute('class', 'fw-bold');
      const button = document.createElement('button');
      button.setAttribute('class', 'btn btn-outline-primary btn-sm');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');

      const titleModel = document.getElementById('modalLabel');
      const aModel = document.getElementById('btn2');

      postsEl.append(divCardsP);
      divCardsP.append(divCardBodyP);
      divCardBodyP.append(titlePosts);

      titlePosts.textContent = 'Posts';
      divCardsP.append(ulP);
      ulP.append(li);
      li.append(a);
      li.append(button);
      a.setAttribute('href', `${post.link}`);
      a.textContent = post.post;

      button.textContent = 'viewing';

      button.addEventListener('click', () => {
        titleModel.textContent = post.post;
        bodyModal.textContent = post.description;
        aModel.setAttribute('href', `${post.link}`);
      });
    });
    dataUrl.feeds.map((feed) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-group-item border-0 border-end-0');
      const h3 = document.createElement('h3');
      h3.setAttribute('class', 'h6 m-0');
      const p = document.createElement('p');
      p.setAttribute('class', 'm-0 small text-black-50');

      feedsEl.append(divCardsF);
      divCardsF.append(divCardBodyF);
      divCardBodyF.append(titleFeels);

      titleFeels.textContent = 'Feeds';
      divCardsF.append(ulF);
      ulF.append(li);
      li.append(h3);
      li.append(p);

      h3.textContent = feed.feed;
      p.textContent = feed.description;
    });
  } else if (state.validate === false) {
    input.className = 'form-control w-100 is-invalid';
    pMsg.className = 'feedback m-0 position-absolute small text-danger';

    if (val.type === 'url') {
      MsgRu.code1 = 'Должен быть УРЛ адрес';
      MsgEn.code1 = val.message;
      const typeURLErr = newI.t('code1');
      pMsg.textContent = typeURLErr;
    }
    if (val.type === 'notOneOf') {
      MsgRu.code2 = 'Данный УРЛ уже добавлен';
      MsgEn.code2 = val.message;
      const typeNotOneOfErr = newI.t('code2');
      pMsg.textContent = typeNotOneOfErr;
    }
  }
};

export default render;
