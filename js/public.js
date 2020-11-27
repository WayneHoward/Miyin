$(function(){
    function setRem(){
        var clientWidth = $(window).width();
        var n = (clientWidth/750) * 10;
        $('html').css('fontSize',parseInt(n,10)+'px');
    }
    setRem();
    $(function(){
        $(window).bind('resize',function(){
            setRem();
        });
    });
});