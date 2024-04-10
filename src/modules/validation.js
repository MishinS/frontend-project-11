import getData from './data.js';
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
            //state.validate = true;
            state.networkError = false;            
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
              const ul = document.getElementById('P_10')
              
                ul.addEventListener('click', e => {
                  e.preventDefault()                
                  const lin = e.target.href
                  const validationLinksRss = (link) => {
                      const schemaStr = yup.string().required().url().trim();
                      return schemaStr.validate(link).then((url) => {
                        state.linksError = false;
                        return url
                      });
                    }
                    const j = 'err' + lin;                    
                    validationLinksRss(j).then(k=> k).catch(err => {                
                      state.validate = false;
                      state.linksError = true;
                      renderMsg(err, state)
                })
              })            
          }).catch((err) => {
            state.validate = false;
            state.networkError = true;            
            renderMsg(err, state);
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

