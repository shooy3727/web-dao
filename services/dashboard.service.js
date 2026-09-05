const bcrypt = require('bcrypt');
const pool = require("../database/db");

// Check HS của user
async function getProfileByUserId(userId) {
  const result = await pool.query(
    `
      SELECT *
      FROM describe_users
      WHERE user_id = $1
      LIMIT 1
    `,
    [userId]
  );

  return result.rows[0] || null;
}


// Tạo Hồ sơ
async function createProfile(data) {
  const {
    userId,
    title,
    description,
    birth,
    price,
    phone,
    location,
    region,
    province,
    area,
    images,
    height,
    weight,
    bust,
    waist,
    hip
  } = data;

  const measurements = {
    height,
    weight,
    bust,
    waist,
    hip
  };

  const query = `
    INSERT INTO describe_users (
      user_id,
      province,
      title,
      location,
      measurements,
      phone,
      description,
      images,
      region,
      area,
      is_verified,
      birth,
      name_area,
      price
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5::jsonb,
      $6,
      $7,
      $8::jsonb,
      $9,
      $10,
      false,
      $11,
      $9,
      $12
    )
    RETURNING *;
  `;

  const values = [
    userId,
    province,
    title,
    location,
    JSON.stringify(measurements),
    phone,
    description,
    JSON.stringify(images),
    region,
    area,
    birth,
    price
  ];

  const result = await pool.query(query, values);
  const profile = result.rows[0];
  
  // Lấy username của owner
  const ownerResult = await pool.query(
    `
      SELECT username
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  profile.owner = ownerResult.rows[0]?.username || null;

  return profile;
}

// ======================================================
//================= Cập nhật Hồ Sơ ======================
async function updateProfile(data) {
  const {
    userId,
    fullname,
    title,
    description,
    birth,
    price,
    phone,
    location,
    region,
    province,
    area,
    height,
    weight,
    bust,
    waist,
    hip
  } = data;

  const measurements = {
    height,
    weight,
    bust,
    waist,
    hip
  };

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // =========================
    // UPDATE USERS
    // =========================
    await client.query(
      `
      UPDATE users
      SET
        fullname = $1,
        updated_at = NOW()
      WHERE id = $2
      `,
      [fullname, userId]
    );

    // =========================
    // UPDATE DESCRIBE_USERS
    // =========================
    const query = `
      UPDATE describe_users
      SET
        province = $1,
        title = $2,
        location = $3,
        phone = $4,
        description = $5,
        region = $6,
        area = $7,
        birth = $8,
        price = $9,
        measurements = $10::jsonb,
        updated_at = NOW()
      WHERE user_id = $11
      RETURNING *;
    `;

    const values = [
      province,
      title,
      location,
      phone,
      description,
      region,
      area,
      birth,
      price,
      JSON.stringify(measurements),
      userId
    ];

    const result = await client.query(query, values);

    await client.query("COMMIT");

    return result.rows[0] || null;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
}

// ============== Thông tin tài khoản ==================
async function getAccountInfo(userId) {
  const query = `
    SELECT
      u.username,
      u.telegram_username,
      u.telegram_verified,
      u.created_at,
      u.status,
      d.is_active
    FROM users u
    LEFT JOIN describe_users d
      ON d.user_id = u.id
    WHERE u.id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0] || null;
}

// Xóa Hồ Sơ
async function deleteProfile(userId) {
  await pool.query(
    `
      DELETE FROM describe_users
      WHERE user_id = $1
    `,
    [userId]
  );
}

//============== Đổi mật khẩu ===================
async function changePassword(userId, currentPassword, newPassword) {

  // Lấy password hash hiện tại
  const result = await pool.query(
    `
    SELECT password_hash
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      message: "Không tìm thấy tài khoản."
    };
  }

  const user = result.rows[0];

  // So sánh mật khẩu cũ
  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );

  if (!isMatch) {
    return {
      success: false,
      message: "Mật khẩu hiện tại không đúng."
    };
  }

  // Hash mật khẩu mới
  const newPasswordHash = await bcrypt.hash(
    newPassword,
    10
  );

  // Cập nhật
  await pool.query(
    `
    UPDATE users
    SET
      password_hash = $1,
      updated_at = NOW()
    WHERE id = $2
    `,
    [newPasswordHash, userId]
  );

  return {
    success: true
  };
}

// Bật - Tắt profile
async function updateProfileVisibility(userId, isActive) {
  const result = await pool.query(
    `
      UPDATE describe_users
      SET is_active = $1
      WHERE user_id = $2
      RETURNING is_active;
    `,
    [isActive, userId]
  );

  return result.rows[0] || null;
}

module.exports = {
  createProfile,
  getProfileByUserId,
  updateProfile,
  getAccountInfo,
  deleteProfile,
  changePassword,
  updateProfileVisibility
};