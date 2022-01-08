/**
 * Dom摸板
 */
var template = (function () {
  function tab(field) {
    switch (field) {
      case 'tab':
        return (
          `<div class="tab-item {{ current }}">{{ tab }}</div>`
        );
      case 'page':
        return (
          `<div class="page-item {{ current }}">{{ page }}</div>`
        );
      default:
        break;
    }
  }

  return {
    tab: tab
  }
})();