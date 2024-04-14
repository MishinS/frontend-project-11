//import  './styles.scss';
//import  'bootstrap';


import i18next from 'i18next';
import _ from 'lodash';

// Initialization i18next, set translation msg. 
const renderMsg = (value, state) => {
  const localizationData = state.localization;
  const newI = i18next.createInstance();
  newI.init({
    lng: 'ru',
    //debug: true,
    resources: localizationData.localizationData.resources,
  });

  let MsgRu = localizationData.localizationData.resources.ru.translation;
  let MsgEn = localizationData.localizationData.resources.en.translation;

  // Render info msgs & input border style

  const input = document.querySelector('input');
  const divExample = document.getElementById('1');
  const pMsg = document.getElementById('msg');
  const checkCreatedElement = document.getElementById('msg');

  if (checkCreatedElement === null) {
    divExample.append(pMsg);
  }

  if (state.validate === true && state.networkError === false && state.linksError === false && state.other === false && state.noUrl === false) {
    // Render validate msg
    input.className = 'form-control w-100 is-valid';
    pMsg.className = 'feedback m-0 position-absolute small text-success';

    MsgRu.code3 = 'RSS успешно загружен';
    MsgEn.code3 = 'Link was success added';
    const successMsg = newI.t('code3');
    pMsg.textContent = successMsg;
  } else if (state.validate === false) {
    input.className = 'form-control w-100 is-invalid';
    pMsg.className = 'feedback m-0 position-absolute small text-danger';
    //console.log(state)
    if (state.networkError === true) {
      MsgRu.code5 = 'Ошибка сети';
      MsgEn.code5 = value.errors.url;
      const typeNotOneOfErr = newI.t('code5');
      pMsg.textContent = typeNotOneOfErr;
    }
    if (state.other === false && state.linksError === true || state.noUrl === true) {
          MsgRu.code6 = 'Ресурс не содержит валидный RSS';
          MsgEn.code6 = value.message;
          const typeURLErr = newI.t('code6');
          pMsg.textContent = typeURLErr;
        
      }

    if (value.type === 'url' && state.other === true) {
      MsgRu.code1 = 'Ссылка должна быть валидным URL';
      MsgEn.code1 = value.message;
      const typeURLErr = newI.t('code1');
      pMsg.textContent = typeURLErr;
    }
    if (value.type === 'notOneOf') {
      MsgRu.code2 = 'RSS уже существует';
      MsgEn.code2 = value.message;
      const typeNotOneOfErr = newI.t('code2');
      pMsg.textContent = typeNotOneOfErr;
    }
    if (value.type === 'required') {
      MsgRu.code4 = 'Не должно быть пустым';
      MsgEn.code4 = value.message;
      const typeNotOneOfErr = newI.t('code4');
      pMsg.textContent = typeNotOneOfErr;
    }
    //console.log(value.type)
  }
};
// Create post & feed containers, render posts & feeds elements
const renderPostsContainer = () => {
  const postsEl = document.querySelector('.posts');

  const divCardsP = document.createElement('div');
  divCardsP.setAttribute('class', 'card border-0');

  const divCardBodyP = document.createElement('div');
  divCardBodyP.setAttribute('class', 'card-body');

  const titlePosts = document.createElement('h2');
  titlePosts.setAttribute('class', 'card-title h4');

  const ulP = document.createElement('ul');
  ulP.setAttribute('class', 'list-group border-0 rounded-0');
  ulP.setAttribute('id', 'P_10');

  postsEl.append(divCardsP);
  divCardsP.append(divCardBodyP);
  divCardBodyP.append(titlePosts);

  titlePosts.textContent = 'Posts';
  divCardsP.append(ulP);
};

const renderPosts = (state) => {
  const posts = state.datas.posts;
  const ulPP = document.getElementById('P_10');

  if (state.validate === true || state.subvalidate === 'ok') {
    const arrUlPNodeChilde = [...ulPP.childNodes];
    arrUlPNodeChilde.map((child) => child.remove());

    let arrLinksElementsA = [];
    let arrElementsA = [];
    posts.map((post) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const button = document.createElement('button');

      li.setAttribute(
        'class',
        'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'
      );
      li.setAttribute('id', 'P_30');

      button.setAttribute('class', 'btn btn-outline-primary btn-sm');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');

      const titleModal = document.getElementById('modalLabel');
      const aModal = document.getElementById('btn2');
      const bodyModal = document.querySelector('.modal-body');

      ulPP.append(li);
      li.append(a);
      li.append(button);
      a.setAttribute('href', `${post.link}`);

      a.textContent = post.post;

      button.textContent = 'Просмотр';

      button.addEventListener('click', () => {
        titleModal.textContent = post.post;
        bodyModal.textContent = post.description;
        aModal.setAttribute('href', `${post.link}`);
      });
      a.setAttribute('class', 'fw-bold');
      arrLinksElementsA.push(a.href);
      arrElementsA.push(a);

      // Set clicked links
      li.addEventListener('click', (e) => {
        //e.preventDefault();
        const currentTarget = e.target.parentNode.childNodes[0];
        state.clicked.push(currentTarget);
        currentTarget.setAttribute('class', 'fw-normal');
      });
    });

    const arrUniqLinks = _.uniqWith(state.clicked, _.isEqual);
    const links = arrUniqLinks.map((e) => e.href);
    const newObject = new Set(links);
    const arrNotClickedLinks = arrLinksElementsA.filter((e) => !newObject.has(e));
    arrElementsA.map((l) => {     
      const t = !_.includes(arrNotClickedLinks, l.href);
      if (t !== true) {
        l.setAttribute('class', 'fw-bold');
      } else {
        l.setAttribute('class', 'fw-normal');
      }
    });
  }
};

const renderFeedsContainer = () => {
  const feedsEl = document.querySelector('.feeds');

  const divCardsF = document.createElement('div');
  divCardsF.setAttribute('class', 'card border-0');

  const divCardBodyF = document.createElement('div');
  divCardBodyF.setAttribute('class', 'card-body');

  const titleFeels = document.createElement('h2');
  titleFeels.setAttribute('class', 'card-title h4');

  const ulF = document.createElement('ul');
  ulF.setAttribute('class', 'list-group border-0 rounded-0');
  ulF.setAttribute('id', 'F_10');

  feedsEl.append(divCardsF);
  divCardsF.append(divCardBodyF);
  divCardBodyF.append(titleFeels);

  titleFeels.textContent = 'Feeds';
  divCardsF.append(ulF);
};

const renderFeeds = (state) => {
  const feeds = state.datas.feeds;
  const ulF = document.getElementById('F_10');

  const arrUlFNodeChilde = [...ulF.childNodes];
  arrUlFNodeChilde.map((child) => child.remove());

  feeds.map((feed) => {
    if (state.validate === true || state.subvalidate === 'ok') {
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');

      li.setAttribute('class', 'list-group-item border-0 border-end-0');
      li.setAttribute('id', 'F_20');

      h3.setAttribute('class', 'h6 m-0');
      p.setAttribute('class', 'm-0 small text-black-50');

      ulF.append(li);
      li.append(h3);
      li.append(p);

      h3.textContent = feed.feed;
      p.textContent = feed.description;
    }
  });
};

const renderF = (state) => {
  if (state.validate === true || state.subvalidate === 'ok') {
    const uniqFeeds = _.uniqWith(state.datas.feeds, _.isEqual);
    state.datas.feeds = uniqFeeds;
    renderFeeds(state);
  }
};

const renderP = (state) => {
  if (state.validate === true || state.subvalidate === 'ok') {
    const uniqPosts = _.uniqWith(state.datas.posts, _.isEqual);
    state.datas.posts = uniqPosts;
    renderPosts(state);
  }
};

export {
  renderMsg,
  renderPostsContainer,
  renderFeedsContainer,
  renderF,
  renderP,
};

