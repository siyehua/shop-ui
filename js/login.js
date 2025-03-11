document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const clearPhoneBtn = document.getElementById('clearPhone');
    const verifyCodeInput = document.getElementById('verifyCode');
    const getVerifyCodeBtn = document.getElementById('getVerifyCode');
    const loginBtn = document.getElementById('loginBtn');

    // 手机号输入监听
    phoneInput.addEventListener('input', function() {
        // 显示/隐藏清除按钮
        clearPhoneBtn.style.display = this.value ? 'block' : 'none';
        
        // 验证手机号格式
        const isValidPhone = /^1[3-9]\d{9}$/.test(this.value);
        getVerifyCodeBtn.disabled = !isValidPhone;
        
        updateLoginButtonState();
    });

    // 清除手机号
    clearPhoneBtn.addEventListener('click', function() {
        phoneInput.value = '';
        clearPhoneBtn.style.display = 'none';
        getVerifyCodeBtn.disabled = true;
        updateLoginButtonState();
    });

    // 验证码输入监听
    verifyCodeInput.addEventListener('input', function() {
        updateLoginButtonState();
    });

    // 获取验证码
    let countdown = 60;
    let timer = null;
    getVerifyCodeBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        // 开始倒计时
        this.disabled = true;
        this.innerText = `${countdown}秒后重试`;
        
        timer = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                this.innerText = `${countdown}秒后重试`;
            } else {
                clearInterval(timer);
                this.disabled = false;
                this.innerText = '获取验证码';
                countdown = 60;
            }
        }, 1000);

        // TODO: 调用发送验证码接口
        console.log('发送验证码到：', phoneInput.value);
    });

    // 登录按钮点击
    loginBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        // TODO: 调用登录接口
        console.log('登录信息：', {
            phone: phoneInput.value,
            verifyCode: verifyCodeInput.value
        });

        // 模拟登录成功后跳转
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    // 更新登录按钮状态
    function updateLoginButtonState() {
        const isValidPhone = /^1[3-9]\d{9}$/.test(phoneInput.value);
        const isValidCode = /^\d{6}$/.test(verifyCodeInput.value);
        loginBtn.disabled = !(isValidPhone && isValidCode);
    }
}); 