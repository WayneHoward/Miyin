$(function(){
    //点击最新&推荐 tab切换
    $('.content .title p').each(function(index,item){
        $(item).on('tap',function(){
          $('.content .title p').find('img').hide();
          $('.content .title p').css('color','#333333');
          $(item).css('color','#ec32a5');
          $(item).find('img').show();
          $('.content ul').hide();
          $('.content ul').eq(index).show();
        });
    });
    
    var urlStr = 'http://192.168.1.94:3000/home?type='
    //轮播图
    $.ajax({
        type: 'GET',
        url: urlStr + 'banner',
        success: function(response){
            inBanner(response);
        }
    });
    function inBanner(data){
        var dot_tem = doT.template($('#list_templateBanner').text());
        $('.swiper-container .swiper-wrapper').append(dot_tem(data));

        var mySwiper = new Swiper ('.swiper-container', {
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          autoplay: {
            delay: 1000,
            disableOnInteraction: false,
            stopOnLastSlide: false,
            // disableOnInteraction: true,
            },
            loop: true, // 循环模式选项
    
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
        });
    }

    //最新
    $.ajax({
        type: 'GET',
        url: urlStr + 'new',
        success: function(response){
            inNew(response);
        }
    });
    function inNew(data){
        var dot_tem = doT.template($('#list_templateNew').text());
        $('.content .new').append(dot_tem(data));
    }

    //推荐
    $.ajax({
        type: 'GET',
        url: urlStr + 'recommend',
        success: function(response){
            inRecommend(response);
        }
    });
    function inRecommend(data){
        var dot_tem = doT.template($('#list_templateRecommend').text());
        $('.content .recommend').append(dot_tem(data));
    }

    //播放&暂停
    var flag = true;
    $('.play .playing, .pauseing').on('tap',function(){
        if (flag){
            setTimeout(function(){
                if ($('#player')[0].paused){
                    $('#player')[0].play();
                    $('.playing').hide();
                    $('.pauseing').show();
                    $('.circle img').css('animation-play-state', 'running');
                }else {
                    $('#player')[0].pause();
                    $('.playing').show();
                    $('.pauseing').hide();
                    $('.circle img').css('animation-play-state', 'paused');
                }

                //时间格式转换
                function totalTime(t){
                    var m = Math.floor(t/60);
                    m < 10 ? m = '0' + m : m;
                    var s = Math.floor(t%60);
                    s < 10 ? s = '0' + s:  s;
                    return m + ':' + s;
                }
                //歌曲进度
                $('#player')[0].addEventListener("timeupdate", function() {
                    $('.progress').text(totalTime(this.currentTime) + '/' + totalTime(this.duration));
                    $('.jp-play-bar').width((this.currentTime / this.duration) * 100 + '%');
                });

                flag = true;
            }, 200);
        }
    flag = false;
    });

    // console.log($('#player')[0].duration);
    // //拖动进度条
    // $('.jp-seek-bar').on('tap',function(e){
    //     e = e || window.event;
    //     var ox = e.offsetX;
    //     var ow = this.offsetWidth;
    //     $('.jp-play-bar').width = ((ox / ow) * 100 + '%');
    //     $('#player')[0].currentTime = (ox / ow) * $('#player')[0].duration;
    // });

    //切换歌曲
    // var index=0;
    // for(var i = 0; i < $('audio').toArray().length; i++){
    //     $('.play .nextMusic').on('tap',function(){
    //         if (flag){
    //             setTimeout(function(){
    //                 index++;
    //                 if(index>$('audio').toArray().length.length){
    //                     index=0;
    //                 }
    //                 console.log($('audio').toArray().length.length);
    //                 $('audio')[index-1].pause();
    //                 $('audio')[index].play();
    //                 $('audio')[index].addEventListener('ended',function(){
    //                     $('audio')[index+1].play();
    //             });
    //             flag = true;
    //             },200);
    //         } 
    //         flag = false; 
    //     });
    // }
});