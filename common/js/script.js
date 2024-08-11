/* ヘッダー */
document.addEventListener('headerLoaded', function () {
  const header = document.querySelector('header');
  if (window.matchMedia('(max-width: 966px)').matches) {
    /* 現在表示しているレイアウトを判別 */
    header.classList.add('sp-header');
  } else {
    header.classList.add('pc-header');
  };
});

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

document.addEventListener('footerLoaded', function () {
  const pagetopArea = document.querySelector('.pagetop');

  // 1画面分下スクロールでページトップボタン表示
  let lastScrollPosition = window.scrollY; // 最後のスクロール位置を保存
  const throttle = function (fn, interval) {
    let lastTime = Date.now() - interval;
    return function () {
      if (lastTime + interval < Date.now()) {
        lastTime = Date.now();
        fn();
      }
    };
  };
  document.addEventListener(
    'scroll',
    throttle(function () {
      const viewportHeight = window.innerHeight;
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        /* 下スクロール */
        if (currentScrollPosition >= viewportHeight) {
          // 1画面スクロールで表示
          if (pagetopArea) {
            pagetopArea.classList.add('is-show');
          }
        }
      } else {
        /* 上スクロール */
        if (currentScrollPosition < viewportHeight) {
          // 1画面分未満スクロールで非表示
          if (pagetopArea) {
            pagetopArea.classList.remove('is-show');
          }
        }
      }
      lastScrollPosition = window.scrollY; // 最後のスクロール位置を更新
    }, 66) // 66ms間隔で実行
  );
});