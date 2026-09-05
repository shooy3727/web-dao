const pool = require("../database/db");


/**
 * Lấy profile của đối tượng theo tỉnh và quận/huyện
 * */ 
async function getProfiles({
    province,
    area = "all",
    page = 1,
    price = "all",
    sort = "default",
    age = "all",
    time = "default",
    limit = 6
}) {

    const offset = (page - 1) * limit;

    let sql = `
      SELECT
        describe_users.*,
        users.fullname
      FROM describe_users
      LEFT JOIN users
        ON users.id = describe_users.user_id
      WHERE describe_users.province = $1
        AND describe_users.is_active = true
    `;

    const params = [province];

    if (area !== "all") {

        sql += `
            AND area = $2
        `;

        params.push(area);

    }

    // Price filter

    if (price !== "all") {

        if (price === "under-500") {

            sql += `
                AND price < 500000
            `;

        }


        if (price === "500-1000") {

            sql += `
                AND price >= 500000
                AND price <= 1000000
            `;

        }


        if (price === "above-1000") {

            sql += `
                AND price > 1000000
            `;

        }

    }

    //======= Bith filter ==============
    const currentYear = new Date().getFullYear();

    if (age !== "all") {

        if (age === "18-20") {

            sql += `
                AND birth BETWEEN $${params.length + 1}
                AND $${params.length + 2}
            `;

            params.push(
                currentYear - 20,
                currentYear - 18
            );

        }


        if (age === "21-23") {

            sql += `
                AND birth BETWEEN $${params.length + 1}
                AND $${params.length + 2}
            `;

            params.push(
                currentYear - 23,
                currentYear - 21
            );

        }


        if (age === "24-26") {

            sql += `
                AND birth BETWEEN $${params.length + 1}
                AND $${params.length + 2}
            `;

            params.push(
                currentYear - 26,
                currentYear - 24
            );

        }


        if (age === "27plus") {

            sql += `
                AND birth <= $${params.length + 1}
            `;

            params.push(
                currentYear - 27
            );

        }

    }

    // Sort price low and high

    let order = `
        is_verified DESC,
        views DESC,
        id DESC
    `;


    if(sort === "low-high") {

        order = `
            is_verified DESC,
            price ASC,
            views DESC,
            id DESC
        `;

    }


    if(sort === "high-low") {

        order = `
            is_verified DESC,
            price DESC,
            views DESC,
            id DESC
        `;

    }

    if (time === "newest") {

        order = `
            created_at DESC,
            is_verified DESC,
            views DESC,
            id DESC
        `;

    }


    sql += `
        ORDER BY
            ${order}

        LIMIT $${params.length + 1}
        OFFSET $${params.length + 2}
    `;

    params.push(limit);
    params.push(offset);

    const result = await pool.query(sql, params);

    return result.rows;

}

/**
 * Lấy danh sách profile
 */
async function getProfilesByProvince(
  province,
  limit = 6
){

    const result = await pool.query(
      `
      SELECT
        describe_users.*,
        users.fullname
      FROM describe_users
      LEFT JOIN users
        ON users.id = describe_users.user_id
      WHERE describe_users.province = $1
        AND describe_users.is_active = true
      ORDER BY
        is_verified DESC,
        views DESC,
        id DESC
      LIMIT $2
      `,
      [province, limit]
    );

    return result.rows;

}

/**
 * Tìm kiếm
 */
async function searchProfiles(
  keyword,
  limit = 20
) {

  const result = await pool.query(
    `
    SELECT *
    FROM describe_users
    WHERE
        is_active = true
        AND (
            title ILIKE $1
            OR location ILIKE $1
            OR province ILIKE $1
        )
    ORDER BY
        is_verified DESC,
        views DESC,
        id DESC
    LIMIT $2;
    `,
    [
        `%${keyword}%`,
        limit
    ]
  );

  return result.rows;
}

module.exports = {
  getProfiles,
  getProfilesByProvince,
  searchProfiles
};