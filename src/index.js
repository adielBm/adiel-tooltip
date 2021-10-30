import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/scale.css';

document.querySelectorAll('.the-content a').forEach( el => {

  const href = el.href

  if ( href.includes('glossary') == false ) return;

  tippy(el, {
    arrow: true,
    animation: 'scale',
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

      const data = new FormData();
      data.append('postUrl', href);
      data.append('action', 'adiel_tooltip');

      instance._isFetching = true;

      fetch(adiel_tooltip.ajaxurl, {
        method: 'POST',
        credentials: 'same-origin',
        body: data
      })
        .then( response => response.json())
        .then( response => {
          console.log(response)
          const data = response.data
          instance.setContent(`<h4>${data.post_title}</h4><span>${data.post_content}</span>`);
        })
        .catch((error) => {
          console.log(error)
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

