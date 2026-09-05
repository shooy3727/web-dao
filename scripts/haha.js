require("dotenv").config();

const pool = require("../database/db");


async function fixPrice() {

    try {

        // 1. Sửa các giá trị price_number đang thiếu 000
        await pool.query(`
            UPDATE describe_users
            SET price_number = price_number * 1000
            WHERE price_number < 1000;
        `);


        // 2. Trường hợp 1,2,3... đang là triệu
        // Nếu có dữ liệu dạng này thì sửa riêng
        await pool.query(`
            UPDATE describe_users
            SET price_number = price_number * 1000000
            WHERE price_number < 10;
        `);


        console.log("Fix price_number done");


        // 3. Xóa price cũ
        await pool.query(`
            ALTER TABLE describe_users
            DROP COLUMN price;
        `);


        console.log("Old price deleted");


        // 4. Đổi tên price_number thành price
        await pool.query(`
            ALTER TABLE describe_users
            RENAME COLUMN price_number TO price;
        `);


        console.log("Rename price_number -> price done");


    } catch(err) {

        console.error(err);

    } finally {

        await pool.end();

    }

}


fixPrice();