const pool = require("../database/db");


/**
 * Lấy profile của đối tượng theo tỉnh và quận/huyện
 * */ 
async function getProfiles({
    province,
    district = "all",
    page = 1,
    limit = 8
}) {

    const offset = (page - 1) * limit;

    let sql = `
        SELECT *
        FROM describe_users
        WHERE province = $1
    `;

    const params = [province];

    if (district !== "all") {

        sql += `
            AND area = $2
        `;

        params.push(district);

    }

    sql += `
        ORDER BY
            is_verified DESC,
            views DESC,
            id DESC
        LIMIT $${params.length + 1}
        OFFSET $${params.length + 2}
    `;

    params.push(limit);
    params.push(offset);

    const result = await pool.query(sql, params);

    console.log(result.rows);

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
        SELECT *
        FROM describe_users
        WHERE province=$1
        ORDER BY

            is_verified DESC,
            views DESC,
            id DESC

        LIMIT $2
        `,

        [province,limit]

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
        title ILIKE $1
        OR location ILIKE $1
        OR province ILIKE $1
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