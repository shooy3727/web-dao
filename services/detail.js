const db = require("../database/db");

async function getProfileById(id, province, area) {
    
    const sql = `
        SELECT
            describe_users.*,
            users.fullname,
            EXTRACT(YEAR FROM CURRENT_DATE) - describe_users.birth AS age
        FROM describe_users
        LEFT JOIN users
            ON users.id = describe_users.user_id
        WHERE describe_users.id = $1
            AND describe_users.province = $2
            AND describe_users.area = $3
        LIMIT 1
    `;

    const result = await db.query(sql, [
        id,
        province,
        area
    ]);

    return result.rows[0];
}

// RELATED PROFILE
async function getRelatedProfiles(profile) {

    const limit = 6;

    let related = [];

    // ==================================================
    // 1. ƯU TIÊN CÙNG TỈNH
    //    - Không giới hạn giá
    //    - Giá gần hơn đứng trước
    // ==================================================

    const provinceSql = `
        SELECT
            describe_users.*,
            users.fullname
        FROM describe_users
        LEFT JOIN users
            ON users.id = describe_users.user_id
        WHERE describe_users.province = $1
        AND describe_users.id != $2
        ORDER BY ABS(describe_users.price - $3)
        LIMIT $4
    `;


    const provinceResult = await db.query(
        provinceSql,
        [
            profile.province,
            profile.id,
            profile.price,
            limit
        ]
    );

    related = provinceResult.rows;

    // ==================================================
    // 2. NẾU CHƯA ĐỦ -> CÙNG MIỀN + GIÁ ±50K
    // ==================================================
    if (related.length < limit) {


        const remain = limit - related.length;


        const existIds = [
            profile.id,
            ...related.map(item => item.id)
        ];



        const minPrice = profile.price - 50000;
        const maxPrice = profile.price + 50000;
        const regionSql = `
            SELECT
                describe_users.*,
                users.fullname
            FROM describe_users
            LEFT JOIN users
                ON users.id = describe_users.user_id
            WHERE describe_users.region = $1
            AND describe_users.price BETWEEN $2 AND $3
            AND describe_users.id != ALL($4)
            ORDER BY ABS(describe_users.price - $5)
            LIMIT $6
        `;

        const regionResult = await db.query(
            regionSql,
            [
                profile.region,
                minPrice,
                maxPrice,
                existIds,
                profile.price,
                remain
            ]
        );

        related.push(...regionResult.rows);

    }

    // ==================================================
    // 3. TRƯỜNG HỢP HIẾM:
    //    Vẫn chưa đủ 6 thì mở rộng cùng miền
    //    (không ép giá nữa)
    // ==================================================
    if (related.length < limit) {


        const remain = limit - related.length;


        const existIds = [
            profile.id,
            ...related.map(item => item.id)
        ];


        const fallbackSql = `
            SELECT
                describe_users.*,
                users.fullname
            FROM describe_users
            LEFT JOIN users
                ON users.id = describe_users.user_id
            WHERE describe_users.region = $1
            AND describe_users.id != ALL($2)
            ORDER BY ABS(describe_users.price - $3)
            LIMIT $4
        `;

        const fallbackResult = await db.query(
            fallbackSql,
            [
                profile.region,
                existIds,
                profile.price,
                remain
            ]
        );

        related.push(...fallbackResult.rows);

    }

    return related;

}

async function increaseViews(id) {
    const sql = `
        UPDATE describe_users
        SET views = views + 1
        WHERE id = $1
    `;

    await db.query(sql, [id]);
}

module.exports = {
    getProfileById,
    getRelatedProfiles,
    increaseViews
};