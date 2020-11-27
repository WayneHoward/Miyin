$(function(){
    var userReg = /^1[0-9]{10}$/;
    var passwordReg = /^[\w]{6,12}$/;

    var flag = true;
    $('.username').on('blur',function(){
        if(userReg.test($('.username').val()) == false || $('.username').val() == ''){
            $('.errorUsername').show();
        }else{
            $('.errorUsername').hide();
        }
    });
    $('.btn').on('tap',function(){
        if (flag){
            setTimeout(function () {
                if(passwordReg.test($('.password').val()) == false || $('.password').val() == ''){
                    $('.errorPassword').show();
                }else{
                    $('.errorPassword').hide();
                }
                flag = true
            }, 200);
        }
        flag = false;
    });

    //验证码按钮
    $('#code').on('tap',function(){
        // $('#code').attr('disabled',true);
        $('#code').css('pointer-events','none');
        var i = 60;
        $('#code').html(i + '秒之后获取验证码');
        var timer2 = setInterval(function(){
            i--;
            $('#code').html(i + '秒之后获取验证码');
            if(i == 0){
                clearInterval(timer2);
                i = 60;
                // $('#code').attr('disabled',false);
                $('#code').html('<img src="./images/register-two.png" alt="">');
                $('#code').css('pointer-events','visible');
            }
        },1000);
    });
});