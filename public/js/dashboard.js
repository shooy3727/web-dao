document.addEventListener('DOMContentLoaded', () => {

  // 1. DỮ LIỆU TỈNH THÀNH / QUẬN HUYỆN THEO VÙNG
  const REGIONS = window.REGIONS;
  const regionSelect = document.getElementById('region');
  const provinceSelect = document.getElementById('province');
  const districtSelect = document.getElementById('district');

  // Xử lý Dynamic Dropdown
  if (regionSelect && provinceSelect && districtSelect) {

    regionSelect.addEventListener('change', function() {
      const region = this.value;

      provinceSelect.innerHTML = '<option value="">-- Chọn Tỉnh / TP --</option>';
      districtSelect.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>';

      if (region && REGIONS[region]) {

        REGIONS[region].forEach(province => {

          const option = document.createElement("option");

          option.value = province.slug;
          option.textContent = province.name;

          provinceSelect.appendChild(option);

        });

      }

    });


    provinceSelect.addEventListener('change', function() {

      const region = regionSelect.value;
      const provinceSlug = this.value;

      districtSelect.innerHTML =
        '<option value="">-- Chọn Quận / Huyện --</option>';


      const province = REGIONS[region]?.find(
        p => p.slug === provinceSlug
      );


      if (province) {

        province.areas.forEach(area => {

          const option = document.createElement("option");

          option.value = area.slug;
          option.textContent = area.name;

          districtSelect.appendChild(option);

        });

      }

    });

  }

  // 2. TOGGLE SIDEBAR MOBILE
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('dashboardSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
  }

  // 3. XỬ LÝ UPLOAD & PREVIEW & DELETE ẢNH (TỐI ĐA 5 ẢNH)
  const uploadSlots = document.querySelectorAll('.upload-slot');

  uploadSlots.forEach(slot => {
    const input = slot.querySelector('.image-input');
    const placeholder = slot.querySelector('.upload-placeholder');
    const previewContainer = slot.querySelector('.image-preview-container');
    const previewImg = slot.querySelector('.preview-img');
    const removeBtn = slot.querySelector('.btn-remove-img');

    // Tải ảnh preview
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Vui lòng chọn file hình ảnh hợp lệ!');
          return;
        }
        const reader = new FileReader();
        reader.onload = function(evt) {
          previewImg.src = evt.target.result;
          previewContainer.classList.remove('hidden');
          placeholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });

    // Nút Xóa Ảnh
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      previewImg.src = '';
      previewContainer.classList.add('hidden');
      placeholder.style.display = 'flex';
    });
  });

  //VALIDATION CHIỀU CAO / CÂN NẶNG / SỐ ĐO
  const measurementRules = {
    height: {
      min: 140,
      max: 200,
      errorId: "error-height",
      message: "Chiều cao phải từ 140 đến 200 cm."
    },

    weight: {
      min: 45,
      max: 100,
      errorId: "error-weight",
      message: "Cân nặng phải từ 45 đến 100 kg."
    },

    bust: {
      min: 50,
      max: 120,
      errorId: "error-bust",
      message: "Vòng ngực phải từ 50 đến 120 cm."
    },

    waist: {
      min: 50,
      max: 120,
      errorId: "error-waist",
      message: "Vòng eo phải từ 50 đến 120 cm."
    },

    hip: {
      min: 50,
      max: 120,
      errorId: "error-hip",
      message: "Vòng mông phải từ 50 đến 120 cm."
    }
  };

  Object.entries(measurementRules).forEach(([id, rule]) => {

    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener("input", function () {

      const value = Number(this.value);
      const error = document.getElementById(rule.errorId);

       // Nếu đang để trống
    if (this.value === "") {
      this.classList.remove("invalid");
      this.setCustomValidity("");

      if (error) {
        error.classList.remove("show");
      }

      return;
    }

    // Nhập sai khoảng
    if (value < rule.min || value > rule.max) {

      this.classList.add("invalid");
      this.setCustomValidity(rule.message);

      if (error) {
        error.textContent = rule.message;
        error.classList.add("show");
      }

    } else {

      this.classList.remove("invalid");
      this.setCustomValidity("");

      if (error) {
        error.classList.remove("show");
      }

    }

    });

  });

  // 4. VALIDATION FORM KHI SUBMIT
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
      document.querySelectorAll('.form-control').forEach(el => el.classList.remove('invalid'));

      // Validate Input fields
      const fields = [
        { id: 'fullname', errorId: 'error-fullname' },
        { id: 'title', errorId: 'error-title' },
        { id: 'description', errorId: 'error-description' },
        { id: 'birth_year', errorId: 'error-birth_year' },
        { id: 'price', errorId: 'error-price' },
        { id: 'phone', errorId: 'error-phone' },
        { id: 'address', errorId: 'error-address' },
        { id: 'region', errorId: 'error-region' },
        { id: 'province', errorId: 'error-province' },
        { id: 'district', errorId: 'error-district' },
        // Measurement 
        { id: 'height', errorId: 'error-height' },
        { id: 'weight', errorId: 'error-weight' },
        { id: 'bust', errorId: 'error-bust' },
        { id: 'waist', errorId: 'error-waist' },
        { id: 'hip', errorId: 'error-hip' }
      ];

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('invalid');
          const err = document.getElementById(field.errorId);
          if (err) err.classList.add('show');
        }
      });

      // Validate ít nhất 1 ảnh được chọn
      let hasImage = false;
      document.querySelectorAll('.image-input').forEach(input => {
        if (input.files && input.files.length > 0) hasImage = true;
      });

      if (!hasImage) {
        isValid = false;
        document.getElementById('error-images').classList.add('show');
      }

      if (!isValid) {
        showToast("Vui lòng kiểm tra lại các trường còn trống!");
        return;
      }

      const formData = new FormData(profileForm);

      // Thêm các ảnh
      document.querySelectorAll(".image-input").forEach(input => {
        if (input.files.length > 0) {
          formData.append("images", input.files[0]);
        }
      });

      try {
        const isEdit = profileForm.dataset.mode === "edit";

        // =========================
        // VALIDATE IMAGE
        // =========================

        let hasNewImage = false;

        document.querySelectorAll('.image-input').forEach(input => {
          if (input.files && input.files.length > 0) {
            hasNewImage = true;
          }
        });

        // Chỉ bắt buộc ảnh khi TẠO hồ sơ
        if (!isEdit && !hasNewImage) {
          isValid = false;

          const errorImages = document.getElementById('error-images');

          if (errorImages) {
            errorImages.classList.add('show');
          }
        }

        // Nếu validation không hợp lệ → DỪNG
        if (!isValid) {
          showToast("Vui lòng kiểm tra lại các thông tin!");
          return;
        }

        // =========================
        // FORM DATA
        // =========================

        const formData = new FormData(profileForm);

        // Chỉ append những ảnh mới được chọn
        document.querySelectorAll(".image-input").forEach(input => {
          if (input.files && input.files.length > 0) {
            formData.append("images", input.files[0]);
          }
        });

        // =========================
        // CREATE / UPDATE
        // =========================

        const response = await fetch(
          isEdit
            ? "/dashboard/update-profile"
            : "/dashboard/create-profile",
          {
            method: isEdit ? "PUT" : "POST",
            body: formData
          }
        );

        const result = await response.json();

        if (!response.ok) {
          showToast(result.message || "Có lỗi xảy ra.");
          return;
        }

        // Tạo mới hoặc cập nhật thành công
        // → Hồ sơ của tôi
        if (result.redirect) {
          window.location.href = result.redirect;
          return;
        }

        showToast(result.message);

      } catch (err) {
        console.error(err);
        showToast("Có lỗi xảy ra.");
      }

    });
  }

  // 5. HÀM TOAST NOTICE
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ============================================
  // HIỂN THỊ / ẨN HỒ SƠ TRÊN HOME
  // ============================================
  const profileStatusToggle = document.getElementById(
    "profileStatusToggle"
  );

  if (profileStatusToggle) {

    profileStatusToggle.addEventListener("change", async function () {

        const toggle = this;
        const active = toggle.checked;

        // Khóa tạm, tránh click liên tục
        toggle.disabled = true;

        try {

            const response = await fetch(
                "/dashboard/profile-visibility",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        active: active
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {

                // Server lỗi → hoàn tác
                toggle.checked = !active;

                showToast(
                    result.message ||
                    "Không thể cập nhật trạng thái."
                );

                return;
            }

            // Thành công → GIỮ NGUYÊN trạng thái
            showToast(
                active
                    ? "Đã bật hiển thị trên trang chủ."
                    : "Đã tắt hiển thị trên trang chủ."
            );

        } catch (error) {

            console.error("PROFILE VISIBILITY ERROR:", error);

            // Lỗi mạng → hoàn tác
            toggle.checked = !active;

            showToast(
                "Không thể kết nối máy chủ. Vui lòng thử lại."
            );

        } finally {

            // Request xong → cho phép click lại
            toggle.disabled = false;
        }
    });
  }

  // Delete profile user
  const deleteBtn = document.querySelector("#deleteProfile");
  const modal = document.querySelector("#deleteModal");
  
  if (!deleteBtn || !modal) return;

  const cancelBtn = document.querySelector("#cancelDeleteBtn");
  const closeBtn = document.querySelector("#closeModalBtn");
  const confirmBtn = document.querySelector("#confirmDeleteBtn");
  const btnText = confirmBtn.querySelector(".btn-text");
  const btnSpinner = confirmBtn.querySelector(".btn-spinner");

  // Mở Modal
  const openModal = () => {
    modal.classList.add("active");
    modal.removeAttribute("aria-hidden");
    modal.removeAttribute("inert"); // Cho phép tương tác khi mở
    closeBtn.focus(); // Đưa focus vào nút đóng khi mở modal
  };

  // Đóng Modal
  const closeModal = () => {
    // Gỡ focus khỏi nút đang bấm trước khi ẩn
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("inert", ""); // Vô hiệu hóa tương tác hoàn toàn khi ẩn
  };

  deleteBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  // Click ra ngoài thẻ card để đóng Modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Xử lý sự kiện Xóa vĩnh viễn
  confirmBtn.addEventListener("click", () => {
    confirmBtn.disabled = true;
    btnText.textContent = "Đang xóa...";
    btnSpinner.classList.remove("hidden");

    fetch("/dashboard/profile", {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/dashboard";
        } else {
          alert(data.message || "Xóa thất bại, vui lòng thử lại!");
          closeModal();
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        closeModal();
      })
      .finally(() => {
        confirmBtn.disabled = false;
        btnText.textContent = "Xóa vĩnh viễn";
        btnSpinner.classList.add("hidden");
      });
  });

  // HIỂN THỊ TÊN TỈNH / KHU VỰC
  const profileProvince = document.getElementById("profileProvince");
  const profileArea = document.getElementById("profileArea");

  if (profileProvince) {

    const province = window.getProvinceBySlug(
      profileProvince.dataset.slug
    );

    if (province) {
      profileProvince.textContent = province.name;
    }

  }

  if (profileArea) {

    const province = window.getProvinceBySlug(
      profileArea.dataset.province
    );

    if (province) {

      const area = province.areas.find(
        a => a.slug === profileArea.dataset.slug
      );

      if (area) {
        profileArea.textContent = area.name;
      }

    }

  }

});