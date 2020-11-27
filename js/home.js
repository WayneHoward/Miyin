$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
    });
});