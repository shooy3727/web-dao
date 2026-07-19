const path = require("path");
const maxmind = require("maxmind");

(async () => {

    const dbPath = path.join(
        __dirname,
        "../database/GeoLite2-City.mmdb"
    );

    const lookup = await maxmind.open(dbPath);

    // Thay IP này bằng IP muốn test
    const ip = "2405:4803:1c2f:1960:e421:40a3:de45:b0dc";

    const result = lookup.get(ip);

    console.log(result);
    console.log("Kết quả trả về là: ", result.subdivisions[0].names);

})();