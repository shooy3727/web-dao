const pool = require("../database/db");

// ============================================
// LẤY TOÀN BỘ USER CHO ADMIN DASHBOARD
// ============================================

async function getAllUsers() {

    const result = await pool.query(`
        SELECT
            u.id,
            u.fullname,
            u.username,
            u.created_at,
            u.telegram_verified,
            u.verified_human,
            u.human_verification_status,
            u.status,
            u.role,

            d.province,
            d.region,
            d.area,
            d.name_area

        FROM users u

        LEFT JOIN describe_users d
            ON d.user_id = u.id

        WHERE u.role = 'user'

        ORDER BY u.created_at DESC
    `);

    return result.rows;
}


// ============================================
// THỐNG KÊ ADMIN DASHBOARD
// ============================================

async function getDashboardStats() {

    const result = await pool.query(`
        SELECT

            COUNT(*) FILTER (
                WHERE role = 'user'
            ) AS total_users,


            COUNT(*) FILTER (
                WHERE role = 'user'
                AND human_verification_status = 'pending'
            ) AS pending_human,


            COUNT(*) FILTER (
                WHERE role = 'user'
                AND human_verification_status = 'approved'
            ) AS verified_human,


            COUNT(*) FILTER (
                WHERE role = 'user'
                AND status = 'active'
            ) AS active_users

        FROM users
    `);

    return result.rows[0];
}


// ============================================
// LẤY USER THEO ID
// ============================================

async function getUserById(userId) {

    const result = await pool.query(
        `
        SELECT
            u.id,
            u.fullname,
            u.username,
            u.created_at,
            u.telegram_verified,
            u.verified_human,
            u.human_verification_status,
            u.status,

            d.province,
            d.region,
            d.area,
            d.name_area

        FROM users u

        LEFT JOIN describe_users d
            ON d.user_id = u.id

        WHERE u.id = $1
        AND u.role = 'user'

        LIMIT 1
        `,
        [userId]
    );

    if (result.rows.length === 0) {
        throw new Error("USER_NOT_FOUND");
    }

    return result.rows[0];
}


// ============================================
// ĐỒNG Ý VERIFIED HUMAN
// ============================================

async function approveHuman(userId) {

    const result = await pool.query(
        `
        UPDATE users
        SET
            verified_human = true,
            human_verification_status = 'approved',
            status = 'active',
            updated_at = NOW()

        WHERE id = $1
        AND role = 'user'

        RETURNING
            id,
            verified_human,
            human_verification_status,
            status
        `,
        [userId]
    );

    if (result.rows.length === 0) {
        throw new Error("USER_NOT_FOUND");
    }

    return result.rows[0];
}


// ============================================
// TỪ CHỐI VERIFIED HUMAN
// ============================================

async function rejectHuman(userId) {

    const result = await pool.query(
        `
        UPDATE users
        SET
            verified_human = false,
            human_verification_status = 'rejected',
            status = 'rejected',
            updated_at = NOW()

        WHERE id = $1
        AND role = 'user'

        RETURNING
            id,
            verified_human,
            human_verification_status,
            status
        `,
        [userId]
    );

    if (result.rows.length === 0) {
        throw new Error("USER_NOT_FOUND");
    }

    return result.rows[0];
}


// ============================================
// EXPORT
// ============================================

module.exports = {
    getAllUsers,
    getDashboardStats,
    getUserById,
    approveHuman,
    rejectHuman
};