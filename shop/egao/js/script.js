    // PC

$('.slider').slick({
    fade:true,//切り替えをフェードで行う。初期値はfalse。
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    autoplaySpeed: 3500,//次のスライドに切り替わる待ち時間
    speed:1000,//スライドの動きのスピード。初期値は300。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 1,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
    arrows: true,//左右の矢印あり
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    dots: true,//下部ドットナビゲーションの表示
        pauseOnFocus: false,//フォーカスで一時停止を無効
        pauseOnHover: false,//マウスホバーで一時停止を無効
        pauseOnDotsHover: false,//ドットナビゲーションをマウスホバーで一時停止を無効
});

$(function(){

	var menu = $('.menu li');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 810) { //スクロールが810pxを越えたら
			menu.addClass('invert');
		}  else { //スクロールが810pxを越えなければ
			menu.removeClass('invert');
		}
	});

});

    // sp

$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});


//グロナビのボタン色切り替え

// $(function(){

// 	var openbtn = $('.openbtn span');
// 	$(window).scroll(function () {
// 		if ($(this).scrollTop() > 850) { //スクロールが850pxを越えたら
// 			openbtn.addClass('invert');
// 		}  else { //スクロールが850pxを越えなければ
// 			openbtn.removeClass('invert');
// 		}
// 	});

// });

