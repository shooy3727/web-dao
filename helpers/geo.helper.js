const path = require("path");
const maxmind = require("maxmind");

const dbPath = path.join(
    __dirname,
    "../database/GeoLite2-City.mmdb"
);

// Chỉ mở database đúng 1 lần
const readerPromise = maxmind.open(dbPath);

/**
 * Lấy IP client
 */
function getClientIp(req) {

  let ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress ||
    "";

  return ip;
}

/**
 * Ho Chi Minh City
 * =>
 * ho-chi-minh
 */
function toSlug(name = "") {
  return name
    .replace(/\s+City$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/**
 * Lấy province theo IP
 */
async function getProvince(ip) {

  if (!ip) {
      return null;
  }

  // IPv6 mapped IPv4
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }

  // DEV: localhost / mạng LAN
  if (process.env.NODE_ENV === "development") {

    if (
        ip === "::1" ||
        ip === "127.0.0.1" ||
        ip.startsWith("192.168.") ||
        ip.startsWith("10.") ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
    ) {
        ip = process.env.GEO_TEST_IP;
    }

  }

  const reader = await readerPromise;
  const result = reader.get(ip);

  if (!result) {
    return null;
  }

  const province = result.subdivisions?.[0]?.names?.en;

  if (!province) {
    return null;
  }

  return toSlug(province);
}

module.exports = {
  getClientIp,
  getProvince,
  toSlug
};