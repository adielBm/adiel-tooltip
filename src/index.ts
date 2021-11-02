import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/scale.css';

import './style.css';

const anchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.the-content a')

anchors.forEach(anchor => {

  const href = anchor.href

  if (href.includes('glossary') == false) return;

  tippy(anchor, {
    arrow: true,
    allowHTML: true,
    interactive: true,
    interactiveBorder: 20,
    interactiveDebounce: 75,
    animation: 'scale',
    content: 'טוען...',
    onShow(instance) {
      const data = new FormData();
      data.append('postUrl', href);
      data.append('action', 'adiel_tooltip');

      fetch('/wordpress/wp-admin/admin-ajax.php', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
      })
        .then(response => response.json())
        .then(response => {
          const data = response.data
          instance.setContent(`<h4>${data.post_title}</h4><div>${data.post_content}</div>`);
        })
        .catch((error) => {
          console.log(error)
          instance.setContent(`Request failed. ${error}`);
        })
        .finally(() => {
        });
    },
    onHidden(instance) {
      instance.setContent('טוען...');
    },
  });
})