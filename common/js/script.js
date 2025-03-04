document.addEventListener('DOMContentLoaded', function () {
  // タブ切り替え
  {
    const tabMenu = document.querySelectorAll('.js-tab-switch');

    function tabSwitch(element) {
      const tabTargetData = element.currentTarget.dataset.tab;
      const tabList = element.currentTarget.closest('.section__tab-head');
      const tabItems = tabList.querySelectorAll('.section__tab-item');
      const tabPanelItems = tabList.nextElementSibling.querySelectorAll('.section__tab-body');

      tabItems.forEach((tabItem) => {
        tabItem.classList.remove('is-active');
      });
      tabPanelItems.forEach((tabPanelItem) => {
        tabPanelItem.classList.remove('is-show');
      });

      element.currentTarget.parentElement.classList.add('is-active');

      tabPanelItems.forEach((tabPanelItem) => {
        if (tabPanelItem.dataset.tabPanel === tabTargetData) {
          tabPanelItem.classList.add('is-show');
        }
      });
    }

    for (let i = 0; i < tabMenu.length; i++) {
      tabMenu[i].addEventListener('click', tabSwitch);
    }
  }
  //スムーズスクロール
  {
    const anchorLinks = document.querySelectorAll('[href^="#"]');
    let headHeight = 110;
    if (document.querySelector('.header')) {
      headHeight = document.querySelector('.header').getBoundingClientRect().height;
    }
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        if (link.hash == '' || link.hash == null) {
          return;
        }
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement == '' || targetElement == null) {
          return;
        }

        // スクロール先の位置を取得
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        // 現在のスクロール位置とスクロール先の位置の差を計算
        const currentPosition = window.scrollY;
        const distance = targetPosition - currentPosition;
        // スクロールを開始
        const duration = 500;
        const startTime = performance.now();
        window.requestAnimationFrame(function scroll(time) {
          const timePassed = time - startTime;
          const progress = timePassed / duration;
          const scrollTop = Math.floor(currentPosition + distance * progress);
          window.scrollTo(0, scrollTop - headHeight);
          if (timePassed < duration) {
            window.requestAnimationFrame(scroll);
          } else {
            // スクロール位置を微調整
            const offset = targetElement.getBoundingClientRect().top;
            window.scrollBy(0, offset - headHeight);
          }
        });
      });
    });
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
         spMenuBody.classList.remove('is-open');
         spBody.style.overflow = null;
     });
   }
  // KVカルーセルのswiperの処理
  {
    const top_swiperElm = document.querySelectorAll('.js-swiper-top-keyvisual');
    if (top_swiperElm.length) {
      const top_swiper = new Swiper('.js-swiper-top-keyvisual', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        breakpoints: {
          768: {
            spaceBetween: 60,
          },
        },
        pagination: {
          el: '.top-keyvisual-carousel__pagination',
          clickable: true,
        },
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
          slideChangeTransitionEnd: function () {
            if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
              const swiperPageNum = this.realIndex;
              const swiper_pagination = document.getElementsByClassName('top-keyvisual-carousel__page');
              const swiper_wrapper = document.getElementsByClassName('swiper-wrapper');
              const swiper_item = document.getElementsByClassName('swiper-slide');
              swiper_pagination[0].style.marginTop = swiper_item[swiperPageNum].children[0].clientHeight - swiper_wrapper[0].clientHeight + 16 + 'px';
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
    const swiperElm = document.querySelectorAll('.js-swiper-shop-about .swiper-slide');
    if (swiperElm.length > 1) {
      const swiper = new Swiper('.js-swiper-shop-about', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        spaceBetween: 15,
        breakpoints: {
          768: {
            spaceBetween: 42,
          },
        },
        pagination: {
          el: '.shop-about-carousel__pagination',
          clickable: true,
        },
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
    } else if (swiperElm.length == 1){
      const swiper = new Swiper('.js-swiper-shop-about', {
        loop: false, 
        autoplay: false,
      });
      const swiperBtn = document.querySelectorAll('.shop-about-carousel__page');
      swiperBtn[0].classList.add('btn-none');
    }
  }
    const pagetopArea = document.querySelector('.pagetop');
    let lastScrollPosition = window.scrollY;
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
          if (currentScrollPosition >= viewportHeight) {
            if (pagetopArea) {
              pagetopArea.classList.add('is-show');
            }
          }
        } else {
          if (currentScrollPosition < viewportHeight) {
            if (pagetopArea) {
              pagetopArea.classList.remove('is-show');
            }
          }
        }
        lastScrollPosition = window.scrollY;
      }, 66)
    );

      // モーダル
    var luminousTrigger = document.querySelector('.luminous');
    if( luminousTrigger !== null ) {
      new Luminous(luminousTrigger);
    }

});