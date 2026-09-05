const pool = require("../database/db");

async function getAreas(province) {

  const sql = `
      SELECT DISTINCT area
      FROM describe_users
      WHERE province = $1
      AND area IS NOT NULL
      ORDER BY area
  `;

  const result = await pool.query(sql, [province]);

  return result.rows;

}

module.exports = {
  getAreas
};