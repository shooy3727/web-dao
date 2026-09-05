document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // FORM NHẬP USERNAME / SĐT
  // ==========================================

  const form = document.getElementById('forgotPasswordForm');
  const identifierInput = document.getElementById('identifier');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn
    ? submitBtn.querySelector('.btn-text')
    : null;

  const formMessage = document.getElementById('formMessage');

  // Chỉ chạy nếu đang ở STEP REQUEST
  if (form && identifierInput && submitBtn) {

    // Real-time subtle input indicator
    identifierInput.addEventListener('input', () => {

      const val = identifierInput.value.trim();

      if (val.length >= 3) {
        identifierInput.classList.add('is-valid');
      } else {
        identifierInput.classList.remove('is-valid');
      }

      // Clear error style on typing
      if (
        formMessage &&
        formMessage.classList.contains('error')
      ) {
        formMessage.style.display = 'none';
        formMessage.className = '';
        formMessage.textContent = '';
      }

    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {

      const value = identifierInput.value.trim();

      // Basic Frontend Validation
      if (!value) {

        e.preventDefault();

        showError(
          'Vui lòng nhập Username hoặc Số điện thoại của bạn.'
        );

        identifierInput.focus();

        return;
      }

      // Double-submit protection
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');

      if (btnText) {

        btnText.setAttribute(
          'data-original-text',
          btnText.textContent
        );

        btnText.textContent = 'Đang xử lý...';
      }

    });

  }


  // ==========================================
  // HÀM HIỂN THỊ LỖI
  // ==========================================

  function showError(msg) {

    if (!formMessage) return;

    formMessage.textContent = msg;
    formMessage.className = 'error';
    formMessage.style.display = 'block';

  }


  // ==========================================
  // OTP COOLDOWN COUNTDOWN
  // ==========================================

  const cooldown = document.getElementById("otpCooldown");

  // Chỉ chạy nếu đang bị cooldown
  if (cooldown) {

    const resendForm = document.getElementById("resendOtpForm");
    const countdownElement = document.getElementById("countdown");

    let seconds = Number(
      cooldown.dataset.remainingSeconds
    );

    const timer = setInterval(() => {

      seconds--;

      if (seconds < 0) {
        seconds = 0;
      }

      if (countdownElement) {

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        countdownElement.textContent = `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
      }

      if (seconds <= 0) {

        clearInterval(timer);

        cooldown.style.display = "none";

        if (resendForm) {
          resendForm.style.display = "block";
        }

      }

    }, 1000);

  }

});