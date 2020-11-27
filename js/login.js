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
});