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
    $('.sendCode').on('blur',function(){
        if($('.sendCode').val() == ''){
            $('.errorCode').show();
        }else{
            $('.errorCode').hide();
        }
    });
    //注册  
    var urlStr = 'http://192.168.1.94:3000/users'
    $('.btn').on('tap',function(){
        if (flag){
            setTimeout(function () {
                if(passwordReg.test($('.password').val()) == false || $('.password').val() == ''){
                    $('.errorPassword').show();
                }else{
                    $('.errorPassword').hide();
                    $.ajax({
                        type: 'POST',
                        url: urlStr,
                        data: 'type=register&phone=' + $('.username').val() + '&pass=' + $('.password').val(),
                        success: function(response){
                            console.log(response);
                            if(response.ok == true){
                                var i = 2;
                                // $('.success').html('注册成功！' + i + '秒后跳转到登录页');
                                layer.open({
                                    type: 2
                                  });
                                var timer = setInterval(function(){
                                    i--;
                                    // $('.success').html('注册成功！' + i + '秒后跳转到登录页');
                                    if(i == 0){
                                        clearInterval(timer);
                                        window.location.href = './login.html'
                                    }
                                },1000);
                            }else{
                                // $('.success').html(response.msg);
                                layer.open({
                                    content: response.msg,
                                    skin: 'msg',
                                    style: 'font-size: 2.7rem',
                                    time: 2 //2秒后自动关闭
                                });
                            }
                        }
                    });
                }
                flag = true;
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