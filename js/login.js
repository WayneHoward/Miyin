$(function(){
    var userReg = /^1[0-9]{10}$/;
    var passwordReg = /^[\w]{6,12}$/;
    var urlStr = 'http://192.168.1.94:3000/users'

    var flag = true;
    $('.username').on('blur',function(){
        if(userReg.test($('.username').val()) == false || $('.username').val() == ''){
            $('.errorUsername').show();
        }else{
            $('.errorUsername').hide();
        }
    });
    //登录
    var urlStr = 'http://192.168.1.94:3000/users'
    $('.btn').on('tap',function(){
        if (flag){
            setTimeout(function () {
                if(passwordReg.test($('.password').val()) == false || $('.password').val() == ''){
                    layer.open({
                        content: '手机号或密码不对',
                        skin: 'msg',
                        style: 'font-size: 2.7rem',
                        time: 2 //2秒后自动关闭
                    });
                }else{
                    // $('.errorPassword').hide();
                    $.ajax({
                        type: 'POST',
                        url: urlStr,
                        data: 'type=login&phone=' + $('.username').val() + '&pass=' + $('.password').val(),
                        success: function(response){
                            console.log(response);
                            if(response.ok == true){
                                var i = 2;
                                // $('.success').html('登录成功！' + i + '秒后跳转到首页');
                                layer.open({
                                    type: 2
                                });
                                var timer = setInterval(function(){
                                    i--;
                                    // $('.success').html('登录成功！' + i + '秒后跳转到首页');
                                    if(i == 0){
                                        clearInterval(timer);
                                        window.location.href = './home.html'
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
});