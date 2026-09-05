document.addEventListener('DOMContentLoaded', () => {
  // 1. LẤY CÁC PHẦN TỬ THẺ HTML
  const modal = document.getElementById('changePassModal');
  const openBtn = document.getElementById('openChangePassModal');
  const closeBtn = document.getElementById('closePassModalBtn');
  const cancelBtn = document.getElementById('cancelPassBtn');
  const passForm = document.getElementById('changePasswordForm');
  const alertBox = document.getElementById('passFormAlert');

  // =========================================================
  // 2. HÀM MỞ / ĐÓNG MODAL
  // =========================================================

  // Hàm Mở Modal
  const openModal = () => {
    if (!modal) return;
    modal.removeAttribute('inert');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Khóa cuộn trang phía sau
  };

  // Hàm Đóng Modal
  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Mở lại cuộn trang

    // Reset Form và Thông báo lỗi khi đóng
    if (passForm) passForm.reset();
    if (alertBox) {
      alertBox.textContent = '';
      alertBox.className = 'alert-message hidden';
    }
  };

  // Nút Mở Modal
  if (openBtn) openBtn.addEventListener('click', openModal);

  // Nút Đóng Modal (Nút X & Nút Hủy)
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // CLICK RA NGOÀI VÙNG MODAL CARD (CLICK OVERLAY) ĐỂ ĐÓNG
  if (modal) {
    modal.addEventListener('click', (e) => {
      // e.target === modal nghĩa là người dùng click đúng vào lớp nền mờ overlay bên ngoài
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Bấm phím ESC trên bàn phím để đóng Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // =========================================================
  // 3. TOGGLE ẨN / HIỆN MẬT KHẨU (NÚT MẮT)
  // =========================================================
  const togglePassBtns = document.querySelectorAll('.btn-toggle-pass');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.type === 'password') {
        input.type = 'text';
        btn.style.color = '#ff2a73'; // Màu hồng khi hiện pass
      } else if (input) {
        input.type = 'password';
        btn.style.color = '#94a3b8'; // Màu xám khi ẩn pass
      }
    });
  });


  // =========================================================
  // 4. XỬ LÝ SUBMIT FORM ĐỔI MẬT KHẨU (AJAX FETCH)
  // =========================================================
  if (passForm) {
    passForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Kiểm tra mật khẩu khớp nhau
      if (newPassword !== confirmPassword) {
        showAlert('Mật khẩu mới và xác nhận mật khẩu không trùng khớp!', 'error');
        return;
      }

      const saveBtn = document.getElementById('savePassBtn');
      const btnText = saveBtn.querySelector('.btn-text');
      const btnSpinner = saveBtn.querySelector('.btn-spinner');

      // Bật trạng thái Loading
      saveBtn.disabled = true;
      if (btnText) btnText.textContent = 'Đang xử lý...';
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      try {
        const response = await fetch('/dashboard/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
          showAlert('Đổi mật khẩu thành công!', 'success');
          setTimeout(() => {
            closeModal();
          }, 1500);
        } else {
          showAlert(data.message || 'Mật khẩu hiện tại không đúng!', 'error');
        }
      } catch (err) {
        showAlert('Có lỗi kết nối, vui lòng thử lại sau!', 'error');
      } finally {
        // Tắt trạng thái Loading
        saveBtn.disabled = false;
        if (btnText) btnText.textContent = 'Cập nhật mật khẩu';
        if (btnSpinner) btnSpinner.classList.add('hidden');
      }
    });
  }

  // Hàm hiển thị thông báo trong Modal
  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `account-alert-message ${type}`;
    alertBox.classList.remove('hidden');
  }
});