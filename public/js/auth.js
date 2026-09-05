function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('tabLoginBtn');
    const registerBtn = document.getElementById('tabRegisterBtn');

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

function togglePasswordVisibility(inputId, iconElem) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconElem.classList.remove('fa-eye');
        iconElem.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        iconElem.classList.remove('fa-eye-slash');
        iconElem.classList.add('fa-eye');
    }
}

/* ==================================================
    LOGIC KIỂM TRA MẬT KHẨU TRÙNG KHỚP (REAL-TIME)
    ================================================== */
document.addEventListener('DOMContentLoaded', function () {
    const regPassword = document.getElementById('regPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');
    const passwordError = document.getElementById('passwordError');
    const registerForm = document.getElementById('registerForm');

    function checkPasswordMatch() {
        const passVal = regPassword.value;
        const confirmVal = regConfirmPassword.value;

        // Chỉ kiểm tra khi người dùng bắt đầu nhập vào ô nhập lại mật khẩu
        if (confirmVal.length > 0) {
            if (passVal !== confirmVal) {
                passwordError.classList.add('active');
                regConfirmPassword.classList.add('input-error');
                return false;
            } else {
                passwordError.classList.remove('active');
                regConfirmPassword.classList.remove('input-error');
                return true;
            }
        } else {
            passwordError.classList.remove('active');
            regConfirmPassword.classList.remove('input-error');
            return true;
        }
    }

    // Bắt sự kiện gõ phím ở cả 2 ô mật khẩu
    regPassword.addEventListener('input', checkPasswordMatch);
    regConfirmPassword.addEventListener('input', checkPasswordMatch);

    // Chặn gửi Form nếu mật khẩu không khớp nhau khi bấm nút Submit
    registerForm.addEventListener('submit', function (e) {
        if (regPassword.value !== regConfirmPassword.value) {
            e.preventDefault(); // Chặn gửi form
            passwordError.classList.add('active');
            regConfirmPassword.classList.add('input-error');
            regConfirmPassword.focus(); // Đưa con trỏ vào ô nhập lại
        }
    });

    switchAuthTab(window.activeTab || "login");
});