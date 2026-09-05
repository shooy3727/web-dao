const adminService = require("../services/admin.service");

// ============================================
// ADMIN DASHBOARD
// ============================================

async function dashboard(req, res) {

    try {

        const [users, stats] = await Promise.all([
            adminService.getAllUsers(),
            adminService.getDashboardStats()
        ]);

        return res.render("dashboard-admin", {
            users,
            stats
        });

    } catch (err) {

        console.error("ADMIN DASHBOARD ERROR:", err);

        return res.status(500).send(
            "Không thể tải Admin Dashboard."
        );

    }

}


// ============================================
// LẤY CHI TIẾT USER
// ============================================

async function getUser(req, res) {

    try {

        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "ID người dùng không hợp lệ."
            });
        }

        const user = await adminService.getUserById(userId);

        return res.json({
            success: true,
            user
        });

    } catch (err) {

        console.error("GET ADMIN USER ERROR:", err);

        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra."
        });

    }

}


// ============================================
// DUYỆT VERIFIED HUMAN
// ============================================

async function approveHuman(req, res) {

    try {

        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "ID người dùng không hợp lệ."
            });
        }

        const user = await adminService.approveHuman(userId);

        return res.json({
            success: true,
            message: "Đã duyệt Verified Human.",
            user
        });

    } catch (err) {

        console.error("APPROVE HUMAN ERROR:", err);

        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Không thể duyệt người dùng."
        });

    }

}


// ============================================
// TỪ CHỐI VERIFIED HUMAN
// ============================================

async function rejectHuman(req, res) {

    try {

        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "ID người dùng không hợp lệ."
            });
        }

        const user = await adminService.rejectHuman(userId);

        return res.json({
            success: true,
            message: "Đã từ chối Verified Human.",
            user
        });

    } catch (err) {

        console.error("REJECT HUMAN ERROR:", err);

        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Không thể từ chối người dùng."
        });

    }

}


module.exports = {
    dashboard,
    getUser,
    approveHuman,
    rejectHuman
};