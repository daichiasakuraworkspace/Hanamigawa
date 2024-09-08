document.addEventListener('DOMContentLoaded', function () {

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

window.addEventListener('load', function () {
  /* ヘッダー */

   /* start:SPハンバーガーメニュー開閉 */
   const spMenuBody = document.querySelector('.js-menu-sp-body');
   const spMenuOpen = document.querySelector('.js-menu-open-sp');
   const spBody= document.querySelector('body');
   if (spMenuOpen) {
     spMenuOpen.addEventListener('click', function () {
      spMenuBody.classList.add('is-open');
      spBody.style.overflow = 'hidden';
     });
   }

   const spMenuClose = document.querySelector('.js-menu-close-sp');
   if (spMenuClose) {
     spMenuClose.addEventListener('click', function () {
       /* コンテンツフェードアウト後にメニューを閉じる */
         spMenuBody.classList.remove('is-open');
         spBody.style.overflow = null;
     });
   }
   /* end:SPハンバーガーメニュー開閉 */
  // KVカルーセルのswiperの処理
  {
    const top_swiperElm = document.querySelectorAll('.js-swiper-top-keyvisual');
    if (top_swiperElm.length) {
      const top_swiper = new Swiper('.js-swiper-top-keyvisual', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        breakpoints: {
          // 768px以上の場合
          768: {
            spaceBetween: 60,
          },
        },
        pagination: {
          el: '.top-keyvisual-carousel__pagination',
          clickable: true,
        },
        // ナビボタンが必要なら追加
        navigation: {
          nextEl: '.top-keyvisual-carousel__button-next',
          prevEl: '.top-keyvisual-carousel__button-prev',
        },
        loop: true,
        speed: 500,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        on: {
          // スライドの切り替わりアニメーションが終了した時に実行
          slideChangeTransitionEnd: function () {
            if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
              const swiperPageNum = this.realIndex;
              const swiper_pagination = document.getElementsByClassName('top-keyvisual-carousel__page');
              const swiper_wrapper = document.getElementsByClassName('swiper-wrapper');
              const swiper_item = document.getElementsByClassName('swiper-slide');
              swiper_pagination[0].style.marginTop = swiper_item[swiperPageNum].children[0].clientHeight - swiper_wrapper[0].clientHeight + 16 + 'px';
              // swiper_itemの高さ - swiper_wrapper（スライダー全体）の高さ + 16pxのマージントップをページネーションに付与
              /* const swiper_inner = document.getElementsByClassName('top-keyvisual-carousel__inner'); */
              /* swiper_inner[0].style.height = swiper_item[swiperPageNum + 1].children[0].clientHeight + 16 + 'px'; */
            }
          },
        },
      });

      const top_trigger = document.querySelectorAll('.js-top-keyvisual-carousel-stop');

      for (let i = 0; i < top_trigger.length; i++) {
        top_trigger[i].addEventListener('click', () => {
          const top_activeSwipe = top_swiper.length ? top_swiper[i] : top_swiper;
          if (top_activeSwipe.autoplay.running) {
            top_activeSwipe.autoplay.stop();
            top_trigger[i].classList.add('is-stop');
          } else {
            top_activeSwipe.autoplay.start();
            top_trigger[i].classList.remove('is-stop');
          }
        });
      }
    }
  }

  // 店舗詳細のswiperの処理
  {
    const swiperElm = document.querySelectorAll('.js-swiper-shop-about');
    if (swiperElm.length) {
      const swiper = new Swiper('.js-swiper-shop-about', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        spaceBetween: 15,
        breakpoints: {
          // 768px以上の場合
          768: {
            spaceBetween: 42,
          },
        },
        pagination: {
          el: '.shop-about-carousel__pagination',
          clickable: true,
        },
        // ナビボタンが必要なら追加
        navigation: {
          nextEl: '.shop-about-carousel__button-next',
          prevEl: '.shop-about-carousel__button-prev',
        },
        loop: true,
        speed: 500,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        }
      });
      const trigger = document.querySelectorAll('.js-shop-about-carousel-stop');

      for (let i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener('click', () => {
          const activeSwipe = swiper.length ? swiper[i] : swiper;
          if (activeSwipe.autoplay.running) {
            activeSwipe.autoplay.stop();
            trigger[i].classList.add('is-stop');
          } else {
            activeSwipe.autoplay.start();
            trigger[i].classList.remove('is-stop');
          }
        });
      }
    }
  }
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