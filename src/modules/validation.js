import getData from './data.js';
import render from './render.js';
import * as yup from 'yup';
import _ from 'lodash';
import { renderMsg, renderPostsContainer, renderFeedsContainer, renderP, renderF} from './render.js';

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
      state.collection.push(currentLink);
      const arrData = [];

      renderFeedsContainer();
      renderPostsContainer();
      
      if (state.collection.length !== 0) {
        state.subvalidate = 'ok'
      }
      
      const render = () => {
        state.collection.map((item) => {
          const currentData = getData(item)
          currentData.then((data) => {
            renderMsg(link, state);

            data.feeds.map((feed) => {
              state.datas.feeds.push(feed)
            })

            data.posts.map((post) => {
                const h = !_.includes(arrData, post.link)
                if (h === true) {              
                  arrData.push(post.link) 
                  state.datas.posts.push(post)
                }
              })
              renderF(state);      
              renderP(state);            
          })
          setTimeout(() => {
            render();
          }, 5000);
        })
      };    
     render();
    })  
    .catch((err) => {      
      state.validate = false;
      renderMsg(err, state);
  })
};

export default valid;

