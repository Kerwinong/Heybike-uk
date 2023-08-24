// 在页面加载前就要完成像素转变，轮播执行后再转变高度不对
const autoReponsive = (varScale) => {
  const width = document.body.clientWidth || window.innerWidth;
  if(width <= 750){
    const scale = varScale?varScale:width / 750;
    const content = 'width=750, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', viewport-fit=cover';
    $('meta[name="viewport"]').attr("content",content);
  }
}
if (Shopify.designMode) {
  if($("body").width() < 500){
    $("body,html").css("font-size", "13.36px");
  }
}else{autoReponsive()}

$(function(){


  // 产品页口风琴
  $(document).on('click', '.accordion [tag-name="accordion-header"]', function(e) {
    // $('[tag-name="accordion-content"]').slideUp(500,"linear");
    // $('[tag-name="accordion-arrow"] i:first-child').hidden();

    // $(this).parent().find('[tag-name="accordion-content"]').slideToggle(500,"linear");
    // $(this).find('[tag-name="accordion-arrow"] i:first-child').toggle();



    var $this = $(this);
    var $content = $this.parent().find('[tag-name="accordion-content"]');
    var $arrows = $('[tag-name="accordion-arrow"] i:first-child');
    var $thisArrows =  $this.find('[tag-name="accordion-arrow"] i:first-child');
  
      $arrows.removeClass('at-minus-r').addClass('at-plus-r');
    if (!$content.is(':visible') ) {
      $thisArrows.removeClass('at-plus-r').addClass('at-minus-r');
    }

    $('.accordion [tag-name="accordion-content"]').not($content).slideUp(500, "linear"); // 收起非当前折叠内容
    $content.slideToggle(500, "linear"); // 打开当前折叠内容





  });

  // 移动端轮播处理
  if ( matchMedia('screen and (max-width: 768px)').matches ) {
    // $('[section-name = "store-features"] .store-info').flickity( { prevNextButtons: false, pageDots: false } );
  }

  // Header触摸白底
  if($(".template-index").length){
    $("#header").mouseover(function(){
      if(!$(this).hasClass("fadeInDown")){
        $(this).addClass("stickyHeader !absolute !top-auto")
      }
    });
    $("#header").mouseleave(function(){
      if(!$(this).hasClass("fadeInDown")){
        $(this).removeClass("stickyHeader !absolute !top-auto")
      }
    });
  }



  // 产品页获取所有锚点链接
  if($(".template-product").length){
    const navLinks = $('[section-name = "product-tabs-nav"] [tag-name = "tabs-wrapper"] a');
    // 产品页的锚点跳转
    $('[section-name = "product-tabs-nav"] [tag-name = "tabs-wrapper"] a').on("click", function(event) {
      event.preventDefault();
      var target = $(this).attr("href");
      var offset = $(target).offset().top + 1;
      $("html, body").animate({
          scrollTop: offset
        }, 1500);
    })

    $(window).on("scroll", function() {
      const scrollPosition = $(window).scrollTop();
      for (var i = 0; i < navLinks.length; i++) {
        const ele = $(navLinks.eq(i).attr('href'));
        const nextEle = $(navLinks.eq(i+1).attr('href'));
        const eleTop = ele.position().top;
        const nextEleTop = nextEle.length?nextEle.position().top:scrollPosition+1;
        if ( eleTop <= scrollPosition && nextEleTop > scrollPosition) {
          navLinks.removeClass('active');
          navLinks.eq(i).addClass('active');
        }
      }
    });


    // todo 需求不完整，规格怎么选，确定后掉api
    $('[section-name = "product-tabs-nav"] [tag-name = "atc-btn"]').on("click", function(event) {
        $(".product-action [type='submit']").click();
    })

    // 移动端头部nav下拉
    $('[tag-name = "product-dropdown"]').on("click", function() {
        $("[tag-name = 'tabs-wrapper']").slideToggle(250,"linear");
        $("[tag-name = 'product-dropdown'] i").toggleClass("rotate-180");
    })
    


  }





})




 




