/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';
import _ from 'lodash';
import getData from './data.js';
import {
  renderMsg, renderPostsContainer, renderFeedsContainer, renderP, renderF,
} from './render.js';

const valid = (link, state) => {
  const validation = (link, collect) => {
    const schemaStr = yup.string().required().url().trim();
    const schemaMix = yup.mixed().notOneOf(collect);
    return schemaStr.validate(link).then((url) => schemaMix.validate(url));
  };
  const currentCollection = state.collection;
  validation(link, currentCollection)
    .then((currentLink) => {
      state.validate = true;
      state.networkError = false;
      state.linksError = false;
      state.noUrl = false;
      state.collection.push(currentLink);
      const arrData = [];

      renderFeedsContainer();
      renderPostsContainer();

      if (state.collection.length !== 0) {
        state.subvalidate = 'ok';
      }

      const render = () => {
        state.collection.map((item) => {
          const currentData = getData(item);
          currentData.then((data) => {
            if (data === null) {
              state.validate = false;
              state.noUrl = true;
              renderMsg(link, state);
            } else {
              state.validate = true;
              state.noUrl = false;
              renderMsg(link, state);
              data.feeds.map((feed) => {
                state.datas.feeds.push(feed);
              });

              data.posts.map((post) => {
                const h = !_.includes(arrData, post.link);
                if (h === true) {
                  arrData.push(post.link);
                  state.datas.posts.push(post);
                }
              });
              renderF(state);
              renderP(state);
            }
          }).catch((err) => {
            state.validate = false;
            state.networkError = true;
            state.other = false;
            state.noUrl = false;
            renderMsg(err, state);
          });

          setTimeout(() => {
            render();
          }, 5000);
        });
      };
      render();
    })
    .catch((err) => {
      state.validate = false;
      state.linksError = false;
      state.networkError = false;
      state.other = true;
      state.noUrl = false;
      renderMsg(err, state);
    });
};

export default valid;
