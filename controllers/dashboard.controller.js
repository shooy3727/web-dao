const dashboardService = require("../services/dashboard.service");

async function index(req, res) {
  try {
    const profile = await dashboardService.getProfileByUserId(req.user.id);
    const accountInfo = await dashboardService.getAccountInfo(req.user.id);

    const page = req.query.edit
      ? "create"
      : profile
        ? "profile"
        : "create";

    res.render("dashboard", {
      user: req.user,
      profile: profile || null,
      page,
      accountInfo
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).send("Có lỗi xảy ra.");
  }
}

async function createProfile(req, res) {
  try {

    const userId = req.user.id;

    const existingProfile = await dashboardService.getProfileByUserId(userId);

    if (existingProfile) {
      return res.json({
        success: false,
        message: "Bạn đã có hồ sơ.",
        redirect: "/dashboard"
      });
    }

    const {
      fullname,
      title,
      description,
      birth_year,
      price,
      phone,
      address,
      region,
      province,
      district,

      // Measurements
      height,
      weight,
      bust,
      waist,
      hip
    } = req.body;

    // =========================
    // VALIDATE
    // =========================

    if (!fullname || fullname.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Họ và tên không hợp lệ."
      });
    }

    if (!title || title.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề hồ sơ quá ngắn."
      });
    }

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Mô tả quá ngắn."
      });
    }

    if (!address || address.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Địa chỉ không hợp lệ."
      });
    }

    const birth = Number(birth_year);
    const currentYear = new Date().getFullYear();

    if (
      !Number.isInteger(birth) ||
      birth < 1950 ||
      birth > currentYear
    ) {
      return res.status(400).json({
        success: false,
        message: "Năm sinh không hợp lệ."
      });
    }

    // Validate Measurement
    const heightNumber = Number(height);
    const weightNumber = Number(weight);
    const bustNumber = Number(bust);
    const waistNumber = Number(waist);
    const hipNumber = Number(hip);

    // Chiều cao
    if (
      !Number.isInteger(heightNumber) ||
      heightNumber < 140 ||
      heightNumber > 200
    ) {
      return res.status(400).json({
        success: false,
        message: "Chiều cao phải từ 140 đến 200 cm."
      });
    }

    // Cân nặng
    if (
      !Number.isInteger(weightNumber) ||
      weightNumber < 45 ||
      weightNumber > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Cân nặng phải từ 45 đến 100 kg."
      });
    }

    // Vòng 1
    if (
      !Number.isInteger(bustNumber) ||
      bustNumber < 50 ||
      bustNumber > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Số đo vòng 1 phải từ 50 đến 120 cm."
      });
    }

    // Vòng 2
    if (
      !Number.isInteger(waistNumber) ||
      waistNumber < 50 ||
      waistNumber > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Số đo vòng 2 phải từ 50 đến 120 cm."
      });
    }

    // Vòng 3
    if (
      !Number.isInteger(hipNumber) ||
      hipNumber < 50 ||
      hipNumber > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Số đo vòng 3 phải từ 50 đến 120 cm."
      });
    }

    const priceNumber = Number(
      String(price).replace(/[^\d]/g, "")
    );

    if (!Number.isInteger(priceNumber) || priceNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Giá dịch vụ không hợp lệ."
      });
    }

    const cleanPhone = phone
      ? phone.replace(/\s+/g, "").trim()
      : "";

    if (!/^0\d{9,10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Số điện thoại không hợp lệ."
      });
    }

    if (!region || !province || !district) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn đầy đủ khu vực."
      });
    }

    if (!req.files || req.files.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng tải lên ít nhất 1 ảnh."
      });
    }

    if (req.files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Tối đa 5 ảnh."
      });
    }

    // IMAGE PATHS
    const images = req.files.map(file =>
      `/uploads/profiles/${file.filename}`
    );

    // SERVICE
    const profile = await dashboardService.createProfile({
      userId: req.user.id,
      title: title.trim(),
      description: description.trim(),
      birth,
      price: priceNumber,
      phone: cleanPhone,
      location: address.trim(),
      region: region.trim(),
      province: province.trim(),
      area: district.trim(),
      images,
      height: heightNumber,
      weight: weightNumber,
      bust: bustNumber,
      waist: waistNumber,
      hip: hipNumber
    });

    return res.json({
      success: true,
      message: "Đăng hồ sơ thành công.",
      redirect: "/dashboard"
    });

  } catch (error) {
    console.error("CREATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Không thể lưu hồ sơ."
    });
  }
}

// ============================================
//========= Update Profile ====================
async function updateProfile(req, res) {
  try {

    const userId = req.user.id;

    const existingProfile = await dashboardService.getProfileByUserId(userId);

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy hồ sơ."
      });
    }

    const {
      fullname,
      title,
      description,
      birth_year,
      price,
      phone,
      address,
      region,
      province,
      district,

      // Measurements
      height,
      weight,
      bust,
      waist,
      hip
    } = req.body;

    // =========================
    // VALIDATE
    // =========================

    if (!fullname || fullname.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Họ và tên không hợp lệ."
      });
    }

    if (!title || title.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề hồ sơ quá ngắn."
      });
    }

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Mô tả quá ngắn."
      });
    }

    if (!address || address.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Địa chỉ không hợp lệ."
      });
    }

    const birth = Number(birth_year);
    const currentYear = new Date().getFullYear();

    if (
      !Number.isInteger(birth) ||
      birth < 1950 ||
      birth > currentYear
    ) {
      return res.status(400).json({
        success: false,
        message: "Năm sinh không hợp lệ."
      });
    }

    // =========================
    // MEASUREMENTS
    // =========================

    const heightNumber = Number(height);
    const weightNumber = Number(weight);
    const bustNumber = Number(bust);
    const waistNumber = Number(waist);
    const hipNumber = Number(hip);

    if (
      !Number.isInteger(heightNumber) ||
      heightNumber < 140 ||
      heightNumber > 200
    ) {
      return res.status(400).json({
        success: false,
        message: "Chiều cao phải từ 140 đến 200 cm."
      });
    }

    if (
      !Number.isInteger(weightNumber) ||
      weightNumber < 45 ||
      weightNumber > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Cân nặng phải từ 45 đến 100 kg."
      });
    }

    if (
      !Number.isInteger(bustNumber) ||
      bustNumber < 50 ||
      bustNumber > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Số đo vòng 1 phải từ 50 đến 120 cm."
      });
    }

    if (
      !Number.isInteger(waistNumber) ||
      waistNumber < 50 ||
      waistNumber > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Số đo vòng 2 phải từ 50 đến 120 cm."
      });
    }

    if (
      !Number.isInteger(hipNumber) ||
      hipNumber < 50 ||
      hipNumber > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Số đo vòng 3 phải từ 50 đến 120 cm."
      });
    }

    // =========================
    // PRICE
    // =========================

    const priceNumber = Number(
      String(price).replace(/[^\d]/g, "")
    );

    if (!Number.isInteger(priceNumber) || priceNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Giá dịch vụ không hợp lệ."
      });
    }

    // =========================
    // PHONE
    // =========================

    const cleanPhone = phone
      ? phone.replace(/\s+/g, "").trim()
      : "";

    if (!/^0\d{9,10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Số điện thoại không hợp lệ."
      });
    }

    // LOCATION
    if (!region || !province || !district) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn đầy đủ khu vực."
      });
    }

    // UPDATE
    const profile = await dashboardService.updateProfile({
      userId,
      fullname: fullname.trim(),

      title: title.trim(),
      description: description.trim(),
      birth,
      price: priceNumber,
      phone: cleanPhone,
      location: address.trim(),
      region: region.trim(),
      province: province.trim(),
      area: district.trim(),

      height: heightNumber,
      weight: weightNumber,
      bust: bustNumber,
      waist: waistNumber,
      hip: hipNumber
    });

    return res.json({
      success: true,
      message: "Cập nhật hồ sơ thành công.",
      redirect: "/dashboard",
      profile
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Không thể cập nhật hồ sơ."
    });
  }
}

//================= Xóa Profile=================
async function deleteProfile(req, res) {
  try {
    await dashboardService.deleteProfile(req.user.id);

    res.json({
      success: true,
      message: "Đã xóa hồ sơ."
    });

  } catch (err) {
    console.error("DELETE PROFILE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Không thể xóa hồ sơ."
    });
  }
}

//========= Account Information ===============
async function account(req, res) {
  try {

    const userId = req.user.id;
    const accountInfo = await dashboardService.getAccountInfo(userId);

    if (!accountInfo) {
      return res.status(404).send("Không tìm thấy tài khoản.");
    }

    return res.render("dashboard", {
      page: "account",
      accountInfo
    });

  } catch (error) {

    console.error("ACCOUNT PAGE ERROR:", error);

    return res.status(500).send("Server Error");
  }
}

//========= Change Password ====================
async function changePassword(req, res) {
  try {

    const userId = req.user.id;
    const {
      currentPassword,
      newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin."
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới phải có ít nhất 6 ký tự."
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới phải khác mật khẩu hiện tại."
      });
    }

    const result = await dashboardService.changePassword(
      userId,
      currentPassword,
      newPassword
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.json({
      success: true,
      message: "Đổi mật khẩu thành công."
    });

  } catch (error) {

    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Không thể đổi mật khẩu."
    });
  }
}

// Bật-Tắt Profile
async function updateProfileVisibility(req, res) {
  try {
    const userId = req.user.id;
    const { active } = req.body;

    if (typeof active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ."
      });
    }

    const result = await dashboardService.updateProfileVisibility(
      userId,
      active
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy hồ sơ."
      });
    }

    return res.json({
      success: true,
      active: result.is_active
    });

  } catch (error) {
    console.error("UPDATE PROFILE VISIBILITY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Không thể cập nhật trạng thái."
    });
  }
}

module.exports = {
  index,
  createProfile,
  updateProfile,
  deleteProfile,
  account,
  changePassword,
  updateProfileVisibility
};