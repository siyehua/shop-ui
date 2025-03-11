document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const verifyCodeInput = document.getElementById('verifyCode');
    const clearPhoneBtn = document.getElementById('clearPhone');
    const getVerifyCodeBtn = document.getElementById('getVerifyCode');
    const loginBtn = document.getElementById('loginBtn');
    let countdown = 60;
    let timer = null;

    // 手机号输入处理
    phoneInput.addEventListener('input', function() {
        // 限制只能输入数字
        this.value = this.value.replace(/\D/g, '');
        
        // 显示/隐藏清除按钮
        clearPhoneBtn.style.display = this.value.length > 0 ? 'block' : 'none';
        
        // 更新获取验证码按钮状态
        getVerifyCodeBtn.disabled = !isValidPhone(this.value);
        
        // 更新登录按钮状态
        updateLoginButtonState();
    });

    // 验证码输入处理
    verifyCodeInput.addEventListener('input', function() {
        // 限制只能输入数字
        this.value = this.value.replace(/\D/g, '');
        
        // 更新登录按钮状态
        updateLoginButtonState();
    });

    // 清除手机号
    clearPhoneBtn.addEventListener('click', function() {
        phoneInput.value = '';
        clearPhoneBtn.style.display = 'none';
        getVerifyCodeBtn.disabled = true;
        updateLoginButtonState();
    });

    // 获取验证码
    getVerifyCodeBtn.addEventListener('click', function() {
        if (!isValidPhone(phoneInput.value)) return;
        
        // 开始倒计时
        startCountdown();
        
        // 这里应该调用后端API获取验证码
        alert('验证码已发送到手机：' + phoneInput.value);
    });

    // 登录按钮点击
    loginBtn.addEventListener('click', function() {
        if (!isValidPhone(phoneInput.value) || !isValidVerifyCode(verifyCodeInput.value)) return;
        
        // 这里应该调用后端API进行登录验证
        alert('登录成功！');
    });

    // 验证手机号格式
    function isValidPhone(phone) {
        return /^1[3-9]\d{9}$/.test(phone);
    }

    // 验证验证码格式
    function isValidVerifyCode(code) {
        return /^\d{6}$/.test(code);
    }

    // 更新登录按钮状态
    function updateLoginButtonState() {
        loginBtn.disabled = !isValidPhone(phoneInput.value) || !isValidVerifyCode(verifyCodeInput.value);
    }

    // 开始倒计时
    function startCountdown() {
        getVerifyCodeBtn.disabled = true;
        let seconds = countdown;
        
        getVerifyCodeBtn.textContent = `${seconds}秒后重试`;
        
        timer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(timer);
                getVerifyCodeBtn.disabled = !isValidPhone(phoneInput.value);
                getVerifyCodeBtn.textContent = '获取验证码';
            } else {
                getVerifyCodeBtn.textContent = `${seconds}秒后重试`;
            }
        }, 1000);
    }

    // 轮播图功能
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderItems = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    // 设置轮播图宽度
    sliderItems.forEach(item => {
        item.style.width = '100%';
    });

    // 切换到指定索引的轮播图
    function slideTo(index) {
        if (index < 0) {
            index = sliderItems.length - 1;
        } else if (index >= sliderItems.length) {
            index = 0;
        }
        
        currentIndex = index;
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新指示点状态
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // 自动轮播
    function startAutoSlide() {
        timer = setInterval(() => {
            slideTo(currentIndex + 1);
        }, 3000);
    }

    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(timer);
    }

    // 点击指示点切换轮播图
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideTo(index);
        });
    });

    // 触摸事件处理
    let startX = 0;
    let moveX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });

    sliderWrapper.addEventListener('touchmove', (e) => {
        moveX = e.touches[0].clientX - startX;
        const offset = -currentIndex * 100 + (moveX / sliderWrapper.offsetWidth) * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    });

    sliderWrapper.addEventListener('touchend', () => {
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                slideTo(currentIndex - 1);
            } else {
                slideTo(currentIndex + 1);
            }
        } else {
            slideTo(currentIndex);
        }
        startAutoSlide();
        moveX = 0;
    });

    // 启动自动轮播
    startAutoSlide();

    // 底部导航交互
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
}); 