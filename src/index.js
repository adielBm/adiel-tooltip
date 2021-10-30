import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling

document.querySelectorAll('.the-content a').forEach( el => {

  const href = el.href

  if ( href.incloud('glossary') == false ) return;

  tippy(el, {
    content: 'טוען...',
    onCreate(instance) {
      // Setup our own custom state properties
      instance._isFetching = false;
      instance._src = null;
      instance._error = null;
    },
    onShow(instance) {
      if (instance._isFetching || instance._src || instance._error) {
        return;
      }
      instance._isFetching = true;

      const data = new FormData();
      data.append('postUrl', href);
  
      fetch(adiel_tooltip.ajaxurl, {
        body: data,
        method: 'POST'
      })
        .then( response => response.json())
        .then( response => {
          instance.setContent(`<h4>${response.post_title}</h4><span>${response.post_content}</span>`);
        })
        .catch((error) => {
          instance._error = error;
          instance.setContent(`Request failed. ${error}`);
        })
        .finally(() => {
          instance._isFetching = false;
        });
    },
    onHidden(instance) {
      instance.setContent('טוען...');
      // Unset these properties so new network requests can be initiated
      instance._src = null;
      instance._error = null;
    },
  });
})

