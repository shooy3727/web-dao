require("dotenv").config();

const pool = require("../database/db");

async function checkArea() {

    try {

        const result = await pool.query(
            `
            SELECT
                province,
                area,
                name_area
            FROM describe_users
            WHERE area IS NOT NULL
            ORDER BY province, area
            LIMIT 100;
            `
        );


        console.table(result.rows);


        process.exit(0);


    } catch(err) {

        console.error(err);

        process.exit(1);

    }

}


checkArea();