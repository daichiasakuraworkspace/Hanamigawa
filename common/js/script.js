// メニューを開く関数
const slideDown = (el) => {
  el.classList.add('is-open');
  el.style.removeProperty('display');
  let display = window.getComputedStyle(el).display;
  if (display === 'none') {
    display = 'block';
  }
  const height = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight;
  el.style.transitionProperty = 'height, margin, padding';
  el.style.transitionDuration = '300ms';
  el.style.transitionTimingFunction = 'ease';
  el.style.height = height + 'px';
  el.style.removeProperty('padding-top');
  el.style.removeProperty('padding-bottom');
  el.style.removeProperty('margin-top');
  el.style.removeProperty('margin-bottom');
  setTimeout(() => {
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
    el.style.removeProperty('transition-timing-function');
  }, 300);
};

// メニューを閉じる関数
const slideUp = (el) => {
  el.style.height = el.offsetHeight + 'px';
  el.offsetHeight;
  el.style.transitionProperty = 'height, margin, padding';
  el.style.transitionDuration = '300ms';
  el.style.transitionTimingFunction = 'ease';
  el.style.overflow = 'hidden';
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  setTimeout(() => {
    el.style.display = 'none';
    el.style.removeProperty('height');
    el.style.removeProperty('padding-top');
    el.style.removeProperty('padding-bottom');
    el.style.removeProperty('margin-top');
    el.style.removeProperty('margin-bottom');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
    el.style.removeProperty('transition-timing-function');
    el.classList.remove('is-open');
  }, 300);
};

const slideToggle = (el) => {
  if (window.getComputedStyle(el).display === 'none') {
    return slideDown(el);
  } else {
    return slideUp(el);
  }
};

// PCSP画像切替
const changeImageEachDevice = () => {
  const changeimgs = document.querySelectorAll('.js-img-switch');
  const windowW = window.innerWidth;
  changeimgs.forEach((img) => {
    const src = img.getAttribute('src');
    const name = src.split('/').reverse()[0].split('.')[0];

    if (windowW > 767) {
      // 画面幅がPCレイアウトの時
      if (name.endsWith('_sp')) {
        img.setAttribute('src', src.replace(/(.*)_sp/, '$1_pc'));
      }
    } else {
      // 画面幅がSPレイアウトの時
      if (name.endsWith('_pc')) {
        img.setAttribute('src', src.replace(/(.*)_pc/, '$1_sp'));
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  // ローカルナビ表示位置調整
  {
    function adjustLnavPos() {
      const breadcrumbTop = document.querySelector('#breadcrumbTop');
      const floatingMenu = document.querySelector('.floating-menu.js-submenu-open-pc');

      if (!breadcrumbTop || !floatingMenu) {
        return;
      }
      if (breadcrumbTop.offsetHeight > 29) {
        const offset = breadcrumbTop.offsetHeight - 29;
        const floatingMenuTop = parseInt(getComputedStyle(floatingMenu).top);
        floatingMenu.style.top = `${floatingMenuTop + offset}px`;
      }
    }

    adjustLnavPos();
  }

  // アコーディオン開閉の処理
  {
    const trigger = document.querySelectorAll('.js-accordion-switch');

    for (let i = 0; i < trigger.length; i++) {
      // 取得したアコーディオンのトリガーにイベントを付与
      trigger[i].addEventListener('click', () => {
        trigger[i].parentElement.classList.toggle('is-active');
        const accordionWrap = trigger[i].closest('.section__accordion');
        accordionWrap.classList.toggle('is-active');
        const content = trigger[i].parentElement.nextElementSibling;
        slideToggle(content);
        fixHeight();
      });
    }
  }

  // タブ切り替えの処理
  {
    const tabMenu = document.querySelectorAll('.js-tab-switch');

    function tabSwitch(e) {
      // クリックされた要素のデータ属性を取得
      const tabTargetData = e.currentTarget.dataset.tab;

      // クリックされた要素の親要素と、その子要素を取得
      const tabList = e.currentTarget.closest('.section__tab-head');
      const tabItems = tabList.querySelectorAll('.section__tab-item');

      // クリックされた要素の親要素の兄弟要素の子要素を取得
      const tabPanelItems = tabList.nextElementSibling.querySelectorAll('.section__tab-body');

      // クリックされたtabの同階層のmenuとpanelのクラスを削除
      tabItems.forEach((tabItem) => {
        tabItem.classList.remove('is-active');
      });
      tabPanelItems.forEach((tabPanelItem) => {
        tabPanelItem.classList.remove('is-show');
      });

      // クリックされたmenu要素にis-activeクラスを付加
      e.currentTarget.parentElement.classList.add('is-active');

      // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
      tabPanelItems.forEach((tabPanelItem) => {
        if (tabPanelItem.dataset.tabPanel === tabTargetData) {
          tabPanelItem.classList.add('is-show');
        }
      });
      fixHeight();
    }

    for (let i = 0; i < tabMenu.length; i++) {
      // 取得したアコーディオンのトリガーにイベントを付与
      tabMenu[i].addEventListener('click', tabSwitch);
    }
  }

  // 横スクロール可能な要素が横スクロールされた時の処理
  {
    const target = document.querySelectorAll('.js-scroll-x');
    const targetTable = document.querySelectorAll('.js-scroll-table');

    for (let i = 0; i < target.length; i++) {
      target[i].onscroll = function () {
        if (target[i].scrollLeft > 0) {
          target[i].nextElementSibling.classList.add('is-hide');
        }
      };
    }

    for (let i = 0; i < targetTable.length; i++) {
      targetTable[i].onscroll = function () {
        if (targetTable[i].scrollLeft > 0) {
          targetTable[i].nextElementSibling.classList.add('is-hide');
        }
      };
    }
  }
});