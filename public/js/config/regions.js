/**
 * regions.js
 *
 * Nguon du lieu dia ly hanh chinh Viet Nam, dung cho luong:
 *   IP location -> tinh/thanh pho -> quan/huyen -> filter database profile
 *
 * QUAN TRONG: Du lieu hanh chinh theo trang thai nam 2020.
 * Khong ap dung cac thay doi / sap nhap hanh chinh sau nam 2020.
 *
 * Cau truc:
 *   - 4 nhom mien: bac, trung, tay_nguyen, nam
 *   - Moi tinh/thanh: { id, slug, name, aliases, provinceCode, areas }
 *   - Moi area (quan/huyen/thi xa/thanh pho thuoc tinh): { id, slug, name }
 */

window.REGIONS = {
    bac: [
        {
            id: "vn-north-ha-noi",
            slug: "ha-noi",
            name: "Hà Nội",
            aliases: ["ha-noi", "hn"],
            provinceCode: "01",
            areas: [
                { id: "ha-noi-ba-dinh", slug: "ba-dinh", name: "Ba Đình" },
                { id: "ha-noi-hoan-kiem", slug: "hoan-kiem", name: "Hoàn Kiếm" },
                { id: "ha-noi-tay-ho", slug: "tay-ho", name: "Tây Hồ" },
                { id: "ha-noi-long-bien", slug: "long-bien", name: "Long Biên" },
                { id: "ha-noi-cau-giay", slug: "cau-giay", name: "Cầu Giấy" },
                { id: "ha-noi-dong-da", slug: "dong-da", name: "Đống Đa" },
                { id: "ha-noi-hai-ba-trung", slug: "hai-ba-trung", name: "Hai Bà Trưng" },
                { id: "ha-noi-hoang-mai", slug: "hoang-mai", name: "Hoàng Mai" },
                { id: "ha-noi-thanh-xuan", slug: "thanh-xuan", name: "Thanh Xuân" },
                { id: "ha-noi-nam-tu-liem", slug: "nam-tu-liem", name: "Nam Từ Liêm" },
                { id: "ha-noi-bac-tu-liem", slug: "bac-tu-liem", name: "Bắc Từ Liêm" },
                { id: "ha-noi-ha-dong", slug: "ha-dong", name: "Hà Đông" },
                { id: "ha-noi-soc-son", slug: "soc-son", name: "Sóc Sơn" },
                { id: "ha-noi-dong-anh", slug: "dong-anh", name: "Đông Anh" },
                { id: "ha-noi-gia-lam", slug: "gia-lam", name: "Gia Lâm" },
                { id: "ha-noi-thanh-tri", slug: "thanh-tri", name: "Thanh Trì" },
                { id: "ha-noi-ba-vi", slug: "ba-vi", name: "Ba Vì" },
                { id: "ha-noi-phuc-tho", slug: "phuc-tho", name: "Phúc Thọ" },
                { id: "ha-noi-dan-phuong", slug: "dan-phuong", name: "Đan Phượng" },
                { id: "ha-noi-hoai-duc", slug: "hoai-duc", name: "Hoài Đức" },
                { id: "ha-noi-quoc-oai", slug: "quoc-oai", name: "Quốc Oai" },
                { id: "ha-noi-thach-that", slug: "thach-that", name: "Thạch Thất" },
                { id: "ha-noi-chuong-my", slug: "chuong-my", name: "Chương Mỹ" },
                { id: "ha-noi-thanh-oai", slug: "thanh-oai", name: "Thanh Oai" },
                { id: "ha-noi-thuong-tin", slug: "thuong-tin", name: "Thường Tín" },
                { id: "ha-noi-phu-xuyen", slug: "phu-xuyen", name: "Phú Xuyên" },
                { id: "ha-noi-ung-hoa", slug: "ung-hoa", name: "Ứng Hòa" },
                { id: "ha-noi-my-duc", slug: "my-duc", name: "Mỹ Đức" },
                { id: "ha-noi-me-linh", slug: "me-linh", name: "Mê Linh" },
                { id: "ha-noi-son-tay", slug: "son-tay", name: "Sơn Tây" }
            ]
        },
        {
            id: "vn-north-ha-giang",
            slug: "ha-giang",
            name: "Hà Giang",
            aliases: ["ha-giang"],
            provinceCode: "02",
            areas: [
                { id: "ha-giang-ha-giang", slug: "ha-giang", name: "Hà Giang" },
                { id: "ha-giang-dong-van", slug: "dong-van", name: "Đồng Văn" },
                { id: "ha-giang-meo-vac", slug: "meo-vac", name: "Mèo Vạc" },
                { id: "ha-giang-yen-minh", slug: "yen-minh", name: "Yên Minh" },
                { id: "ha-giang-quan-ba", slug: "quan-ba", name: "Quản Bạ" },
                { id: "ha-giang-vi-xuyen", slug: "vi-xuyen", name: "Vị Xuyên" },
                { id: "ha-giang-bac-me", slug: "bac-me", name: "Bắc Mê" },
                { id: "ha-giang-hoang-su-phi", slug: "hoang-su-phi", name: "Hoàng Su Phì" },
                { id: "ha-giang-xin-man", slug: "xin-man", name: "Xín Mần" },
                { id: "ha-giang-bac-quang", slug: "bac-quang", name: "Bắc Quang" },
                { id: "ha-giang-quang-binh", slug: "quang-binh", name: "Quang Bình" }
            ]
        },
        {
            id: "vn-north-cao-bang",
            slug: "cao-bang",
            name: "Cao Bằng",
            aliases: ["cao-bang"],
            provinceCode: "04",
            areas: [
                { id: "cao-bang-cao-bang", slug: "cao-bang", name: "Cao Bằng" },
                { id: "cao-bang-bao-lam", slug: "bao-lam", name: "Bảo Lâm" },
                { id: "cao-bang-bao-lac", slug: "bao-lac", name: "Bảo Lạc" },
                { id: "cao-bang-ha-quang", slug: "ha-quang", name: "Hà Quảng" },
                { id: "cao-bang-ha-lang", slug: "ha-lang", name: "Hạ Lang" },
                { id: "cao-bang-hoa-an", slug: "hoa-an", name: "Hòa An" },
                { id: "cao-bang-nguyen-binh", slug: "nguyen-binh", name: "Nguyên Bình" },
                { id: "cao-bang-quang-hoa", slug: "quang-hoa", name: "Quảng Hòa" },
                { id: "cao-bang-thach-an", slug: "thach-an", name: "Thạch An" },
                { id: "cao-bang-trung-khanh", slug: "trung-khanh", name: "Trùng Khánh" }
            ]
        },
        {
            id: "vn-north-bac-kan",
            slug: "bac-kan",
            name: "Bắc Kạn",
            aliases: ["bac-kan"],
            provinceCode: "06",
            areas: [
                { id: "bac-kan-bac-kan", slug: "bac-kan", name: "Bắc Kạn" },
                { id: "bac-kan-pac-nam", slug: "pac-nam", name: "Pác Nặm" },
                { id: "bac-kan-ba-be", slug: "ba-be", name: "Ba Bể" },
                { id: "bac-kan-ngan-son", slug: "ngan-son", name: "Ngân Sơn" },
                { id: "bac-kan-bach-thong", slug: "bach-thong", name: "Bạch Thông" },
                { id: "bac-kan-cho-don", slug: "cho-don", name: "Chợ Đồn" },
                { id: "bac-kan-cho-moi", slug: "cho-moi", name: "Chợ Mới" },
                { id: "bac-kan-na-ri", slug: "na-ri", name: "Na Rì" }
            ]
        },
        {
            id: "vn-north-tuyen-quang",
            slug: "tuyen-quang",
            name: "Tuyên Quang",
            aliases: ["tuyen-quang"],
            provinceCode: "08",
            areas: [
                { id: "tuyen-quang-tuyen-quang", slug: "tuyen-quang", name: "Tuyên Quang" },
                { id: "tuyen-quang-lam-binh", slug: "lam-binh", name: "Lâm Bình" },
                { id: "tuyen-quang-na-hang", slug: "na-hang", name: "Na Hang" },
                { id: "tuyen-quang-chiem-hoa", slug: "chiem-hoa", name: "Chiêm Hóa" },
                { id: "tuyen-quang-ham-yen", slug: "ham-yen", name: "Hàm Yên" },
                { id: "tuyen-quang-yen-son", slug: "yen-son", name: "Yên Sơn" },
                { id: "tuyen-quang-son-duong", slug: "son-duong", name: "Sơn Dương" }
            ]
        },
        {
            id: "vn-north-lao-cai",
            slug: "lao-cai",
            name: "Lào Cai",
            aliases: ["lao-cai"],
            provinceCode: "10",
            areas: [
                { id: "lao-cai-lao-cai", slug: "lao-cai", name: "Lào Cai" },
                { id: "lao-cai-sa-pa", slug: "sa-pa", name: "Sa Pa" },
                { id: "lao-cai-bat-xat", slug: "bat-xat", name: "Bát Xát" },
                { id: "lao-cai-muong-khuong", slug: "muong-khuong", name: "Mường Khương" },
                { id: "lao-cai-si-ma-cai", slug: "si-ma-cai", name: "Si Ma Cai" },
                { id: "lao-cai-bac-ha", slug: "bac-ha", name: "Bắc Hà" },
                { id: "lao-cai-bao-thang", slug: "bao-thang", name: "Bảo Thắng" },
                { id: "lao-cai-bao-yen", slug: "bao-yen", name: "Bảo Yên" },
                { id: "lao-cai-van-ban", slug: "van-ban", name: "Văn Bàn" }
            ]
        },
        {
            id: "vn-north-dien-bien",
            slug: "dien-bien",
            name: "Điện Biên",
            aliases: ["dien-bien"],
            provinceCode: "11",
            areas: [
                { id: "dien-bien-dien-bien-phu", slug: "dien-bien-phu", name: "Điện Biên Phủ" },
                { id: "dien-bien-muong-lay", slug: "muong-lay", name: "Mường Lay" },
                { id: "dien-bien-muong-nhe", slug: "muong-nhe", name: "Mường Nhé" },
                { id: "dien-bien-muong-cha", slug: "muong-cha", name: "Mường Chà" },
                { id: "dien-bien-tua-chua", slug: "tua-chua", name: "Tủa Chùa" },
                { id: "dien-bien-tuan-giao", slug: "tuan-giao", name: "Tuần Giáo" },
                { id: "dien-bien-dien-bien", slug: "dien-bien", name: "Điện Biên" },
                { id: "dien-bien-dien-bien-dong", slug: "dien-bien-dong", name: "Điện Biên Đông" },
                { id: "dien-bien-muong-ang", slug: "muong-ang", name: "Mường Ảng" },
                { id: "dien-bien-nam-po", slug: "nam-po", name: "Nậm Pồ" }
            ]
        },
        {
            id: "vn-north-lai-chau",
            slug: "lai-chau",
            name: "Lai Châu",
            aliases: ["lai-chau"],
            provinceCode: "12",
            areas: [
                { id: "lai-chau-lai-chau", slug: "lai-chau", name: "Lai Châu" },
                { id: "lai-chau-tam-duong", slug: "tam-duong", name: "Tam Đường" },
                { id: "lai-chau-muong-te", slug: "muong-te", name: "Mường Tè" },
                { id: "lai-chau-sin-ho", slug: "sin-ho", name: "Sìn Hồ" },
                { id: "lai-chau-phong-tho", slug: "phong-tho", name: "Phong Thổ" },
                { id: "lai-chau-than-uyen", slug: "than-uyen", name: "Than Uyên" },
                { id: "lai-chau-tan-uyen", slug: "tan-uyen", name: "Tân Uyên" },
                { id: "lai-chau-nam-nhun", slug: "nam-nhun", name: "Nậm Nhùn" }
            ]
        },
        {
            id: "vn-north-son-la",
            slug: "son-la",
            name: "Sơn La",
            aliases: ["son-la"],
            provinceCode: "14",
            areas: [
                { id: "son-la-son-la", slug: "son-la", name: "Sơn La" },
                { id: "son-la-quynh-nhai", slug: "quynh-nhai", name: "Quỳnh Nhai" },
                { id: "son-la-thuan-chau", slug: "thuan-chau", name: "Thuận Châu" },
                { id: "son-la-muong-la", slug: "muong-la", name: "Mường La" },
                { id: "son-la-bac-yen", slug: "bac-yen", name: "Bắc Yên" },
                { id: "son-la-phu-yen", slug: "phu-yen", name: "Phù Yên" },
                { id: "son-la-moc-chau", slug: "moc-chau", name: "Mộc Châu" },
                { id: "son-la-yen-chau", slug: "yen-chau", name: "Yên Châu" },
                { id: "son-la-mai-son", slug: "mai-son", name: "Mai Sơn" },
                { id: "son-la-song-ma", slug: "song-ma", name: "Sông Mã" },
                { id: "son-la-sop-cop", slug: "sop-cop", name: "Sốp Cộp" },
                { id: "son-la-van-ho", slug: "van-ho", name: "Vân Hồ" }
            ]
        },
        {
            id: "vn-north-yen-bai",
            slug: "yen-bai",
            name: "Yên Bái",
            aliases: ["yen-bai"],
            provinceCode: "15",
            areas: [
                { id: "yen-bai-yen-bai", slug: "yen-bai", name: "Yên Bái" },
                { id: "yen-bai-nghia-lo", slug: "nghia-lo", name: "Nghĩa Lộ" },
                { id: "yen-bai-luc-yen", slug: "luc-yen", name: "Lục Yên" },
                { id: "yen-bai-van-yen", slug: "van-yen", name: "Văn Yên" },
                { id: "yen-bai-mu-cang-chai", slug: "mu-cang-chai", name: "Mù Cang Chải" },
                { id: "yen-bai-tran-yen", slug: "tran-yen", name: "Trấn Yên" },
                { id: "yen-bai-tram-tau", slug: "tram-tau", name: "Trạm Tấu" },
                { id: "yen-bai-van-chan", slug: "van-chan", name: "Văn Chấn" },
                { id: "yen-bai-yen-binh", slug: "yen-binh", name: "Yên Bình" }
            ]
        },
        {
            id: "vn-north-hoa-binh",
            slug: "hoa-binh",
            name: "Hòa Bình",
            aliases: ["hoa-binh"],
            provinceCode: "17",
            areas: [
                { id: "hoa-binh-hoa-binh", slug: "hoa-binh", name: "Hòa Bình" },
                { id: "hoa-binh-luong-son", slug: "luong-son", name: "Lương Sơn" },
                { id: "hoa-binh-kim-boi", slug: "kim-boi", name: "Kim Bôi" },
                { id: "hoa-binh-cao-phong", slug: "cao-phong", name: "Cao Phong" },
                { id: "hoa-binh-tan-lac", slug: "tan-lac", name: "Tân Lạc" },
                { id: "hoa-binh-mai-chau", slug: "mai-chau", name: "Mai Châu" },
                { id: "hoa-binh-da-bac", slug: "da-bac", name: "Đà Bắc" },
                { id: "hoa-binh-yen-thuy", slug: "yen-thuy", name: "Yên Thủy" },
                { id: "hoa-binh-lac-son", slug: "lac-son", name: "Lạc Sơn" },
                { id: "hoa-binh-lac-thuy", slug: "lac-thuy", name: "Lạc Thủy" }
            ]
        },
        {
            id: "vn-north-thai-nguyen",
            slug: "thai-nguyen",
            name: "Thái Nguyên",
            aliases: ["thai-nguyen"],
            provinceCode: "19",
            areas: [
                { id: "thai-nguyen-thai-nguyen", slug: "thai-nguyen", name: "Thái Nguyên" },
                { id: "thai-nguyen-song-cong", slug: "song-cong", name: "Sông Công" },
                { id: "thai-nguyen-pho-yen", slug: "pho-yen", name: "Phổ Yên" },
                { id: "thai-nguyen-dinh-hoa", slug: "dinh-hoa", name: "Định Hóa" },
                { id: "thai-nguyen-phu-luong", slug: "phu-luong", name: "Phú Lương" },
                { id: "thai-nguyen-dong-hy", slug: "dong-hy", name: "Đồng Hỷ" },
                { id: "thai-nguyen-vo-nhai", slug: "vo-nhai", name: "Võ Nhai" },
                { id: "thai-nguyen-dai-tu", slug: "dai-tu", name: "Đại Từ" },
                { id: "thai-nguyen-phu-binh", slug: "phu-binh", name: "Phú Bình" }
            ]
        },
        {
            id: "vn-north-lang-son",
            slug: "lang-son",
            name: "Lạng Sơn",
            aliases: ["lang-son"],
            provinceCode: "20",
            areas: [
                { id: "lang-son-lang-son", slug: "lang-son", name: "Lạng Sơn" },
                { id: "lang-son-trang-dinh", slug: "trang-dinh", name: "Tràng Định" },
                { id: "lang-son-binh-gia", slug: "binh-gia", name: "Bình Gia" },
                { id: "lang-son-van-lang", slug: "van-lang", name: "Văn Lãng" },
                { id: "lang-son-cao-loc", slug: "cao-loc", name: "Cao Lộc" },
                { id: "lang-son-van-quan", slug: "van-quan", name: "Văn Quan" },
                { id: "lang-son-bac-son", slug: "bac-son", name: "Bắc Sơn" },
                { id: "lang-son-huu-lung", slug: "huu-lung", name: "Hữu Lũng" },
                { id: "lang-son-chi-lang", slug: "chi-lang", name: "Chi Lăng" },
                { id: "lang-son-loc-binh", slug: "loc-binh", name: "Lộc Bình" },
                { id: "lang-son-dinh-lap", slug: "dinh-lap", name: "Đình Lập" }
            ]
        },
        {
            id: "vn-north-quang-ninh",
            slug: "quang-ninh",
            name: "Quảng Ninh",
            aliases: ["quang-ninh"],
            provinceCode: "22",
            areas: [
                { id: "quang-ninh-ha-long", slug: "ha-long", name: "Hạ Long" },
                { id: "quang-ninh-mong-cai", slug: "mong-cai", name: "Móng Cái" },
                { id: "quang-ninh-cam-pha", slug: "cam-pha", name: "Cẩm Phả" },
                { id: "quang-ninh-uong-bi", slug: "uong-bi", name: "Uông Bí" },
                { id: "quang-ninh-quang-yen", slug: "quang-yen", name: "Quảng Yên" },
                { id: "quang-ninh-dong-trieu", slug: "dong-trieu", name: "Đông Triều" },
                { id: "quang-ninh-binh-lieu", slug: "binh-lieu", name: "Bình Liêu" },
                { id: "quang-ninh-tien-yen", slug: "tien-yen", name: "Tiên Yên" },
                { id: "quang-ninh-dam-ha", slug: "dam-ha", name: "Đầm Hà" },
                { id: "quang-ninh-hai-ha", slug: "hai-ha", name: "Hải Hà" },
                { id: "quang-ninh-ba-che", slug: "ba-che", name: "Ba Chẽ" },
                { id: "quang-ninh-van-don", slug: "van-don", name: "Vân Đồn" },
                { id: "quang-ninh-co-to", slug: "co-to", name: "Cô Tô" }
            ]
        },
        {
            id: "vn-north-bac-giang",
            slug: "bac-giang",
            name: "Bắc Giang",
            aliases: ["bac-giang"],
            provinceCode: "24",
            areas: [
                { id: "bac-giang-bac-giang", slug: "bac-giang", name: "Bắc Giang" },
                { id: "bac-giang-yen-the", slug: "yen-the", name: "Yên Thế" },
                { id: "bac-giang-tan-yen", slug: "tan-yen", name: "Tân Yên" },
                { id: "bac-giang-lang-giang", slug: "lang-giang", name: "Lạng Giang" },
                { id: "bac-giang-luc-nam", slug: "luc-nam", name: "Lục Nam" },
                { id: "bac-giang-luc-ngan", slug: "luc-ngan", name: "Lục Ngạn" },
                { id: "bac-giang-son-dong", slug: "son-dong", name: "Sơn Động" },
                { id: "bac-giang-yen-dung", slug: "yen-dung", name: "Yên Dũng" },
                { id: "bac-giang-viet-yen", slug: "viet-yen", name: "Việt Yên" },
                { id: "bac-giang-hiep-hoa", slug: "hiep-hoa", name: "Hiệp Hòa" }
            ]
        },
        {
            id: "vn-north-phu-tho",
            slug: "phu-tho",
            name: "Phú Thọ",
            aliases: ["phu-tho"],
            provinceCode: "25",
            areas: [
                { id: "phu-tho-viet-tri", slug: "viet-tri", name: "Việt Trì" },
                { id: "phu-tho-phu-tho", slug: "phu-tho", name: "Phú Thọ" },
                { id: "phu-tho-doan-hung", slug: "doan-hung", name: "Đoan Hùng" },
                { id: "phu-tho-ha-hoa", slug: "ha-hoa", name: "Hạ Hòa" },
                { id: "phu-tho-thanh-ba", slug: "thanh-ba", name: "Thanh Ba" },
                { id: "phu-tho-phu-ninh", slug: "phu-ninh", name: "Phù Ninh" },
                { id: "phu-tho-yen-lap", slug: "yen-lap", name: "Yên Lập" },
                { id: "phu-tho-cam-khe", slug: "cam-khe", name: "Cẩm Khê" },
                { id: "phu-tho-tam-nong", slug: "tam-nong", name: "Tam Nông" },
                { id: "phu-tho-lam-thao", slug: "lam-thao", name: "Lâm Thao" },
                { id: "phu-tho-thanh-son", slug: "thanh-son", name: "Thanh Sơn" },
                { id: "phu-tho-thanh-thuy", slug: "thanh-thuy", name: "Thanh Thủy" },
                { id: "phu-tho-tan-son", slug: "tan-son", name: "Tân Sơn" }
            ]
        },
        {
            id: "vn-north-vinh-phuc",
            slug: "vinh-phuc",
            name: "Vĩnh Phúc",
            aliases: ["vinh-phuc"],
            provinceCode: "26",
            areas: [
                { id: "vinh-phuc-vinh-yen", slug: "vinh-yen", name: "Vĩnh Yên" },
                { id: "vinh-phuc-phuc-yen", slug: "phuc-yen", name: "Phúc Yên" },
                { id: "vinh-phuc-lap-thach", slug: "lap-thach", name: "Lập Thạch" },
                { id: "vinh-phuc-tam-duong", slug: "tam-duong", name: "Tam Dương" },
                { id: "vinh-phuc-tam-dao", slug: "tam-dao", name: "Tam Đảo" },
                { id: "vinh-phuc-binh-xuyen", slug: "binh-xuyen", name: "Bình Xuyên" },
                { id: "vinh-phuc-yen-lac", slug: "yen-lac", name: "Yên Lạc" },
                { id: "vinh-phuc-vinh-tuong", slug: "vinh-tuong", name: "Vĩnh Tường" },
                { id: "vinh-phuc-song-lo", slug: "song-lo", name: "Sông Lô" }
            ]
        },
        {
            id: "vn-north-bac-ninh",
            slug: "bac-ninh",
            name: "Bắc Ninh",
            aliases: ["bac-ninh"],
            provinceCode: "27",
            areas: [
                { id: "bac-ninh-bac-ninh", slug: "bac-ninh", name: "Bắc Ninh" },
                { id: "bac-ninh-tu-son", slug: "tu-son", name: "Từ Sơn" },
                { id: "bac-ninh-yen-phong", slug: "yen-phong", name: "Yên Phong" },
                { id: "bac-ninh-que-vo", slug: "que-vo", name: "Quế Võ" },
                { id: "bac-ninh-tien-du", slug: "tien-du", name: "Tiên Du" },
                { id: "bac-ninh-thuan-thanh", slug: "thuan-thanh", name: "Thuận Thành" },
                { id: "bac-ninh-gia-binh", slug: "gia-binh", name: "Gia Bình" },
                { id: "bac-ninh-luong-tai", slug: "luong-tai", name: "Lương Tài" }
            ]
        },
        {
            id: "vn-north-hai-duong",
            slug: "hai-duong",
            name: "Hải Dương",
            aliases: ["hai-duong"],
            provinceCode: "30",
            areas: [
                { id: "hai-duong-hai-duong", slug: "hai-duong", name: "Hải Dương" },
                { id: "hai-duong-chi-linh", slug: "chi-linh", name: "Chí Linh" },
                { id: "hai-duong-kinh-mon", slug: "kinh-mon", name: "Kinh Môn" },
                { id: "hai-duong-nam-sach", slug: "nam-sach", name: "Nam Sách" },
                { id: "hai-duong-thanh-ha", slug: "thanh-ha", name: "Thanh Hà" },
                { id: "hai-duong-cam-giang", slug: "cam-giang", name: "Cẩm Giàng" },
                { id: "hai-duong-binh-giang", slug: "binh-giang", name: "Bình Giang" },
                { id: "hai-duong-gia-loc", slug: "gia-loc", name: "Gia Lộc" },
                { id: "hai-duong-tu-ky", slug: "tu-ky", name: "Tứ Kỳ" },
                { id: "hai-duong-ninh-giang", slug: "ninh-giang", name: "Ninh Giang" },
                { id: "hai-duong-thanh-mien", slug: "thanh-mien", name: "Thanh Miện" },
                { id: "hai-duong-kim-thanh", slug: "kim-thanh", name: "Kim Thành" }
            ]
        },
        {
            id: "vn-north-hai-phong",
            slug: "hai-phong",
            name: "Hải Phòng",
            aliases: ["hai-phong", "hp"],
            provinceCode: "31",
            areas: [
                { id: "hai-phong-hong-bang", slug: "hong-bang", name: "Hồng Bàng" },
                { id: "hai-phong-ngo-quyen", slug: "ngo-quyen", name: "Ngô Quyền" },
                { id: "hai-phong-le-chan", slug: "le-chan", name: "Lê Chân" },
                { id: "hai-phong-hai-an", slug: "hai-an", name: "Hải An" },
                { id: "hai-phong-kien-an", slug: "kien-an", name: "Kiến An" },
                { id: "hai-phong-do-son", slug: "do-son", name: "Đồ Sơn" },
                { id: "hai-phong-duong-kinh", slug: "duong-kinh", name: "Dương Kinh" },
                { id: "hai-phong-thuy-nguyen", slug: "thuy-nguyen", name: "Thủy Nguyên" },
                { id: "hai-phong-an-duong", slug: "an-duong", name: "An Dương" },
                { id: "hai-phong-an-lao", slug: "an-lao", name: "An Lão" },
                { id: "hai-phong-kien-thuy", slug: "kien-thuy", name: "Kiến Thụy" },
                { id: "hai-phong-tien-lang", slug: "tien-lang", name: "Tiên Lãng" },
                { id: "hai-phong-vinh-bao", slug: "vinh-bao", name: "Vĩnh Bảo" },
                { id: "hai-phong-cat-hai", slug: "cat-hai", name: "Cát Hải" },
                { id: "hai-phong-bach-long-vi", slug: "bach-long-vi", name: "Bạch Long Vĩ" }
            ]
        },
        {
            id: "vn-north-hung-yen",
            slug: "hung-yen",
            name: "Hưng Yên",
            aliases: ["hung-yen"],
            provinceCode: "33",
            areas: [
                { id: "hung-yen-hung-yen", slug: "hung-yen", name: "Hưng Yên" },
                { id: "hung-yen-my-hao", slug: "my-hao", name: "Mỹ Hào" },
                { id: "hung-yen-van-lam", slug: "van-lam", name: "Văn Lâm" },
                { id: "hung-yen-van-giang", slug: "van-giang", name: "Văn Giang" },
                { id: "hung-yen-yen-my", slug: "yen-my", name: "Yên Mỹ" },
                { id: "hung-yen-an-thi", slug: "an-thi", name: "Ân Thi" },
                { id: "hung-yen-khoai-chau", slug: "khoai-chau", name: "Khoái Châu" },
                { id: "hung-yen-kim-dong", slug: "kim-dong", name: "Kim Động" },
                { id: "hung-yen-tien-lu", slug: "tien-lu", name: "Tiên Lữ" },
                { id: "hung-yen-phu-cu", slug: "phu-cu", name: "Phù Cừ" }
            ]
        },
        {
            id: "vn-north-thai-binh",
            slug: "thai-binh",
            name: "Thái Bình",
            aliases: ["thai-binh"],
            provinceCode: "34",
            areas: [
                { id: "thai-binh-thai-binh", slug: "thai-binh", name: "Thái Bình" },
                { id: "thai-binh-quynh-phu", slug: "quynh-phu", name: "Quỳnh Phụ" },
                { id: "thai-binh-hung-ha", slug: "hung-ha", name: "Hưng Hà" },
                { id: "thai-binh-dong-hung", slug: "dong-hung", name: "Đông Hưng" },
                { id: "thai-binh-thai-thuy", slug: "thai-thuy", name: "Thái Thụy" },
                { id: "thai-binh-tien-hai", slug: "tien-hai", name: "Tiền Hải" },
                { id: "thai-binh-kien-xuong", slug: "kien-xuong", name: "Kiến Xương" },
                { id: "thai-binh-vu-thu", slug: "vu-thu", name: "Vũ Thư" }
            ]
        },
        {
            id: "vn-north-ha-nam",
            slug: "ha-nam",
            name: "Hà Nam",
            aliases: ["ha-nam"],
            provinceCode: "35",
            areas: [
                { id: "ha-nam-phu-ly", slug: "phu-ly", name: "Phủ Lý" },
                { id: "ha-nam-duy-tien", slug: "duy-tien", name: "Duy Tiên" },
                { id: "ha-nam-kim-bang", slug: "kim-bang", name: "Kim Bảng" },
                { id: "ha-nam-thanh-liem", slug: "thanh-liem", name: "Thanh Liêm" },
                { id: "ha-nam-binh-luc", slug: "binh-luc", name: "Bình Lục" },
                { id: "ha-nam-ly-nhan", slug: "ly-nhan", name: "Lý Nhân" }
            ]
        },
        {
            id: "vn-north-nam-dinh",
            slug: "nam-dinh",
            name: "Nam Định",
            aliases: ["nam-dinh"],
            provinceCode: "36",
            areas: [
                { id: "nam-dinh-nam-dinh", slug: "nam-dinh", name: "Nam Định" },
                { id: "nam-dinh-my-loc", slug: "my-loc", name: "Mỹ Lộc" },
                { id: "nam-dinh-vu-ban", slug: "vu-ban", name: "Vụ Bản" },
                { id: "nam-dinh-y-yen", slug: "y-yen", name: "Ý Yên" },
                { id: "nam-dinh-nghia-hung", slug: "nghia-hung", name: "Nghĩa Hưng" },
                { id: "nam-dinh-nam-truc", slug: "nam-truc", name: "Nam Trực" },
                { id: "nam-dinh-truc-ninh", slug: "truc-ninh", name: "Trực Ninh" },
                { id: "nam-dinh-xuan-truong", slug: "xuan-truong", name: "Xuân Trường" },
                { id: "nam-dinh-giao-thuy", slug: "giao-thuy", name: "Giao Thủy" },
                { id: "nam-dinh-hai-hau", slug: "hai-hau", name: "Hải Hậu" }
            ]
        },
        {
            id: "vn-north-ninh-binh",
            slug: "ninh-binh",
            name: "Ninh Bình",
            aliases: ["ninh-binh"],
            provinceCode: "37",
            areas: [
                { id: "ninh-binh-ninh-binh", slug: "ninh-binh", name: "Ninh Bình" },
                { id: "ninh-binh-tam-diep", slug: "tam-diep", name: "Tam Điệp" },
                { id: "ninh-binh-nho-quan", slug: "nho-quan", name: "Nho Quan" },
                { id: "ninh-binh-gia-vien", slug: "gia-vien", name: "Gia Viễn" },
                { id: "ninh-binh-hoa-lu", slug: "hoa-lu", name: "Hoa Lư" },
                { id: "ninh-binh-yen-khanh", slug: "yen-khanh", name: "Yên Khánh" },
                { id: "ninh-binh-kim-son", slug: "kim-son", name: "Kim Sơn" },
                { id: "ninh-binh-yen-mo", slug: "yen-mo", name: "Yên Mô" }
            ]
        }
    ],
    trung: [
        {
            id: "vn-central-thanh-hoa",
            slug: "thanh-hoa",
            name: "Thanh Hóa",
            aliases: ["thanh-hoa"],
            provinceCode: "38",
            areas: [
                { id: "thanh-hoa-thanh-hoa", slug: "thanh-hoa", name: "Thanh Hóa" },
                { id: "thanh-hoa-sam-son", slug: "sam-son", name: "Sầm Sơn" },
                { id: "thanh-hoa-bim-son", slug: "bim-son", name: "Bỉm Sơn" },
                { id: "thanh-hoa-nghi-son", slug: "nghi-son", name: "Nghi Sơn" },
                { id: "thanh-hoa-quan-hoa", slug: "quan-hoa", name: "Quan Hóa" },
                { id: "thanh-hoa-ba-thuoc", slug: "ba-thuoc", name: "Bá Thước" },
                { id: "thanh-hoa-quan-son", slug: "quan-son", name: "Quan Sơn" },
                { id: "thanh-hoa-lang-chanh", slug: "lang-chanh", name: "Lang Chánh" },
                { id: "thanh-hoa-ngoc-lac", slug: "ngoc-lac", name: "Ngọc Lặc" },
                { id: "thanh-hoa-cam-thuy", slug: "cam-thuy", name: "Cẩm Thủy" },
                { id: "thanh-hoa-thach-thanh", slug: "thach-thanh", name: "Thạch Thành" },
                { id: "thanh-hoa-ha-trung", slug: "ha-trung", name: "Hà Trung" },
                { id: "thanh-hoa-vinh-loc", slug: "vinh-loc", name: "Vĩnh Lộc" },
                { id: "thanh-hoa-yen-dinh", slug: "yen-dinh", name: "Yên Định" },
                { id: "thanh-hoa-tho-xuan", slug: "tho-xuan", name: "Thọ Xuân" },
                { id: "thanh-hoa-thuong-xuan", slug: "thuong-xuan", name: "Thường Xuân" },
                { id: "thanh-hoa-trieu-son", slug: "trieu-son", name: "Triệu Sơn" },
                { id: "thanh-hoa-thieu-hoa", slug: "thieu-hoa", name: "Thiệu Hóa" },
                { id: "thanh-hoa-hoang-hoa", slug: "hoang-hoa", name: "Hoằng Hóa" },
                { id: "thanh-hoa-hau-loc", slug: "hau-loc", name: "Hậu Lộc" },
                { id: "thanh-hoa-nga-son", slug: "nga-son", name: "Nga Sơn" },
                { id: "thanh-hoa-nhu-thanh", slug: "nhu-thanh", name: "Như Thanh" },
                { id: "thanh-hoa-nhu-xuan", slug: "nhu-xuan", name: "Như Xuân" },
                { id: "thanh-hoa-dong-son", slug: "dong-son", name: "Đông Sơn" },
                { id: "thanh-hoa-quang-xuong", slug: "quang-xuong", name: "Quảng Xương" },
                { id: "thanh-hoa-nong-cong", slug: "nong-cong", name: "Nông Cống" },
                { id: "thanh-hoa-muong-lat", slug: "muong-lat", name: "Mường Lát" }
            ]
        },
        {
            id: "vn-central-nghe-an",
            slug: "nghe-an",
            name: "Nghệ An",
            aliases: ["nghe-an"],
            provinceCode: "40",
            areas: [
                { id: "nghe-an-vinh", slug: "vinh", name: "Vinh" },
                { id: "nghe-an-cua-lo", slug: "cua-lo", name: "Cửa Lò" },
                { id: "nghe-an-thai-hoa", slug: "thai-hoa", name: "Thái Hòa" },
                { id: "nghe-an-hoang-mai", slug: "hoang-mai", name: "Hoàng Mai" },
                { id: "nghe-an-que-phong", slug: "que-phong", name: "Quế Phong" },
                { id: "nghe-an-quy-chau", slug: "quy-chau", name: "Quỳ Châu" },
                { id: "nghe-an-ky-son", slug: "ky-son", name: "Kỳ Sơn" },
                { id: "nghe-an-tuong-duong", slug: "tuong-duong", name: "Tương Dương" },
                { id: "nghe-an-con-cuong", slug: "con-cuong", name: "Con Cuông" },
                { id: "nghe-an-anh-son", slug: "anh-son", name: "Anh Sơn" },
                { id: "nghe-an-tan-ky", slug: "tan-ky", name: "Tân Kỳ" },
                { id: "nghe-an-quy-hop", slug: "quy-hop", name: "Quỳ Hợp" },
                { id: "nghe-an-nghia-dan", slug: "nghia-dan", name: "Nghĩa Đàn" },
                { id: "nghe-an-quynh-luu", slug: "quynh-luu", name: "Quỳnh Lưu" },
                { id: "nghe-an-dien-chau", slug: "dien-chau", name: "Diễn Châu" },
                { id: "nghe-an-yen-thanh", slug: "yen-thanh", name: "Yên Thành" },
                { id: "nghe-an-do-luong", slug: "do-luong", name: "Đô Lương" },
                { id: "nghe-an-thanh-chuong", slug: "thanh-chuong", name: "Thanh Chương" },
                { id: "nghe-an-nam-dan", slug: "nam-dan", name: "Nam Đàn" },
                { id: "nghe-an-hung-nguyen", slug: "hung-nguyen", name: "Hưng Nguyên" },
                { id: "nghe-an-nghi-loc", slug: "nghi-loc", name: "Nghi Lộc" }
            ]
        },
        {
            id: "vn-central-ha-tinh",
            slug: "ha-tinh",
            name: "Hà Tĩnh",
            aliases: ["ha-tinh"],
            provinceCode: "42",
            areas: [
                { id: "ha-tinh-ha-tinh", slug: "ha-tinh", name: "Hà Tĩnh" },
                { id: "ha-tinh-hong-linh", slug: "hong-linh", name: "Hồng Lĩnh" },
                { id: "ha-tinh-ky-anh", slug: "ky-anh", name: "Kỳ Anh" },
                { id: "ha-tinh-huong-son", slug: "huong-son", name: "Hương Sơn" },
                { id: "ha-tinh-duc-tho", slug: "duc-tho", name: "Đức Thọ" },
                { id: "ha-tinh-vu-quang", slug: "vu-quang", name: "Vũ Quang" },
                { id: "ha-tinh-nghi-xuan", slug: "nghi-xuan", name: "Nghi Xuân" },
                { id: "ha-tinh-can-loc", slug: "can-loc", name: "Can Lộc" },
                { id: "ha-tinh-huong-khe", slug: "huong-khe", name: "Hương Khê" },
                { id: "ha-tinh-thach-ha", slug: "thach-ha", name: "Thạch Hà" },
                { id: "ha-tinh-cam-xuyen", slug: "cam-xuyen", name: "Cẩm Xuyên" },
                { id: "ha-tinh-loc-ha", slug: "loc-ha", name: "Lộc Hà" }
            ]
        },
        {
            id: "vn-central-quang-binh",
            slug: "quang-binh",
            name: "Quảng Bình",
            aliases: ["quang-binh"],
            provinceCode: "44",
            areas: [
                { id: "quang-binh-dong-hoi", slug: "dong-hoi", name: "Đồng Hới" },
                { id: "quang-binh-ba-don", slug: "ba-don", name: "Ba Đồn" },
                { id: "quang-binh-minh-hoa", slug: "minh-hoa", name: "Minh Hóa" },
                { id: "quang-binh-tuyen-hoa", slug: "tuyen-hoa", name: "Tuyên Hóa" },
                { id: "quang-binh-quang-trach", slug: "quang-trach", name: "Quảng Trạch" },
                { id: "quang-binh-bo-trach", slug: "bo-trach", name: "Bố Trạch" },
                { id: "quang-binh-quang-ninh", slug: "quang-ninh", name: "Quảng Ninh" },
                { id: "quang-binh-le-thuy", slug: "le-thuy", name: "Lệ Thủy" }
            ]
        },
        {
            id: "vn-central-quang-tri",
            slug: "quang-tri",
            name: "Quảng Trị",
            aliases: ["quang-tri"],
            provinceCode: "45",
            areas: [
                { id: "quang-tri-dong-ha", slug: "dong-ha", name: "Đông Hà" },
                { id: "quang-tri-quang-tri", slug: "quang-tri", name: "Quảng Trị" },
                { id: "quang-tri-vinh-linh", slug: "vinh-linh", name: "Vĩnh Linh" },
                { id: "quang-tri-huong-hoa", slug: "huong-hoa", name: "Hướng Hóa" },
                { id: "quang-tri-gio-linh", slug: "gio-linh", name: "Gio Linh" },
                { id: "quang-tri-da-krong", slug: "da-krong", name: "Đa Krông" },
                { id: "quang-tri-cam-lo", slug: "cam-lo", name: "Cam Lộ" },
                { id: "quang-tri-trieu-phong", slug: "trieu-phong", name: "Triệu Phong" },
                { id: "quang-tri-hai-lang", slug: "hai-lang", name: "Hải Lăng" },
                { id: "quang-tri-con-co", slug: "con-co", name: "Cồn Cỏ" }
            ]
        },
        {
            id: "vn-central-thua-thien-hue",
            slug: "thua-thien-hue",
            name: "Thừa Thiên Huế",
            aliases: ["thua-thien-hue", "hue"],
            provinceCode: "46",
            areas: [
                { id: "thua-thien-hue-hue", slug: "hue", name: "Huế" },
                { id: "thua-thien-hue-huong-thuy", slug: "huong-thuy", name: "Hương Thủy" },
                { id: "thua-thien-hue-huong-tra", slug: "huong-tra", name: "Hương Trà" },
                { id: "thua-thien-hue-phong-dien", slug: "phong-dien", name: "Phong Điền" },
                { id: "thua-thien-hue-quang-dien", slug: "quang-dien", name: "Quảng Điền" },
                { id: "thua-thien-hue-phu-vang", slug: "phu-vang", name: "Phú Vang" },
                { id: "thua-thien-hue-phu-loc", slug: "phu-loc", name: "Phú Lộc" },
                { id: "thua-thien-hue-a-luoi", slug: "a-luoi", name: "A Lưới" },
                { id: "thua-thien-hue-nam-dong", slug: "nam-dong", name: "Nam Đông" }
            ]
        },
        {
            id: "vn-central-da-nang",
            slug: "da-nang",
            name: "Đà Nẵng",
            aliases: ["da-nang", "dn"],
            provinceCode: "48",
            areas: [
                { id: "da-nang-hai-chau", slug: "hai-chau", name: "Hải Châu" },
                { id: "da-nang-thanh-khe", slug: "thanh-khe", name: "Thanh Khê" },
                { id: "da-nang-son-tra", slug: "son-tra", name: "Sơn Trà" },
                { id: "da-nang-ngu-hanh-son", slug: "ngu-hanh-son", name: "Ngũ Hành Sơn" },
                { id: "da-nang-lien-chieu", slug: "lien-chieu", name: "Liên Chiểu" },
                { id: "da-nang-cam-le", slug: "cam-le", name: "Cẩm Lệ" },
                { id: "da-nang-hoa-vang", slug: "hoa-vang", name: "Hòa Vang" },
                { id: "da-nang-hoang-sa", slug: "hoang-sa", name: "Hoàng Sa" }
            ]
        },
        {
            id: "vn-central-quang-nam",
            slug: "quang-nam",
            name: "Quảng Nam",
            aliases: ["quang-nam"],
            provinceCode: "49",
            areas: [
                { id: "quang-nam-tam-ky", slug: "tam-ky", name: "Tam Kỳ" },
                { id: "quang-nam-hoi-an", slug: "hoi-an", name: "Hội An" },
                { id: "quang-nam-dien-ban", slug: "dien-ban", name: "Điện Bàn" },
                { id: "quang-nam-tay-giang", slug: "tay-giang", name: "Tây Giang" },
                { id: "quang-nam-dong-giang", slug: "dong-giang", name: "Đông Giang" },
                { id: "quang-nam-dai-loc", slug: "dai-loc", name: "Đại Lộc" },
                { id: "quang-nam-duy-xuyen", slug: "duy-xuyen", name: "Duy Xuyên" },
                { id: "quang-nam-que-son", slug: "que-son", name: "Quế Sơn" },
                { id: "quang-nam-nam-giang", slug: "nam-giang", name: "Nam Giang" },
                { id: "quang-nam-phuoc-son", slug: "phuoc-son", name: "Phước Sơn" },
                { id: "quang-nam-hiep-duc", slug: "hiep-duc", name: "Hiệp Đức" },
                { id: "quang-nam-thang-binh", slug: "thang-binh", name: "Thăng Bình" },
                { id: "quang-nam-tien-phuoc", slug: "tien-phuoc", name: "Tiên Phước" },
                { id: "quang-nam-bac-tra-my", slug: "bac-tra-my", name: "Bắc Trà My" },
                { id: "quang-nam-nam-tra-my", slug: "nam-tra-my", name: "Nam Trà My" },
                { id: "quang-nam-nui-thanh", slug: "nui-thanh", name: "Núi Thành" },
                { id: "quang-nam-phu-ninh", slug: "phu-ninh", name: "Phú Ninh" },
                { id: "quang-nam-nong-son", slug: "nong-son", name: "Nông Sơn" }
            ]
        },
        {
            id: "vn-central-quang-ngai",
            slug: "quang-ngai",
            name: "Quảng Ngãi",
            aliases: ["quang-ngai"],
            provinceCode: "51",
            areas: [
                { id: "quang-ngai-quang-ngai", slug: "quang-ngai", name: "Quảng Ngãi" },
                { id: "quang-ngai-duc-pho", slug: "duc-pho", name: "Đức Phổ" },
                { id: "quang-ngai-binh-son", slug: "binh-son", name: "Bình Sơn" },
                { id: "quang-ngai-tra-bong", slug: "tra-bong", name: "Trà Bồng" },
                { id: "quang-ngai-son-tinh", slug: "son-tinh", name: "Sơn Tịnh" },
                { id: "quang-ngai-tu-nghia", slug: "tu-nghia", name: "Tư Nghĩa" },
                { id: "quang-ngai-son-ha", slug: "son-ha", name: "Sơn Hà" },
                { id: "quang-ngai-son-tay", slug: "son-tay", name: "Sơn Tây" },
                { id: "quang-ngai-minh-long", slug: "minh-long", name: "Minh Long" },
                { id: "quang-ngai-nghia-hanh", slug: "nghia-hanh", name: "Nghĩa Hành" },
                { id: "quang-ngai-mo-duc", slug: "mo-duc", name: "Mộ Đức" },
                { id: "quang-ngai-ba-to", slug: "ba-to", name: "Ba Tơ" },
                { id: "quang-ngai-ly-son", slug: "ly-son", name: "Lý Sơn" }
            ]
        },
        {
            id: "vn-central-binh-dinh",
            slug: "binh-dinh",
            name: "Bình Định",
            aliases: ["binh-dinh"],
            provinceCode: "52",
            areas: [
                { id: "binh-dinh-quy-nhon", slug: "quy-nhon", name: "Quy Nhơn" },
                { id: "binh-dinh-an-nhon", slug: "an-nhon", name: "An Nhơn" },
                { id: "binh-dinh-hoai-nhon", slug: "hoai-nhon", name: "Hoài Nhơn" },
                { id: "binh-dinh-an-lao", slug: "an-lao", name: "An Lão" },
                { id: "binh-dinh-hoai-an", slug: "hoai-an", name: "Hoài Ân" },
                { id: "binh-dinh-phu-my", slug: "phu-my", name: "Phù Mỹ" },
                { id: "binh-dinh-vinh-thanh", slug: "vinh-thanh", name: "Vĩnh Thạnh" },
                { id: "binh-dinh-tay-son", slug: "tay-son", name: "Tây Sơn" },
                { id: "binh-dinh-phu-cat", slug: "phu-cat", name: "Phù Cát" },
                { id: "binh-dinh-tuy-phuoc", slug: "tuy-phuoc", name: "Tuy Phước" },
                { id: "binh-dinh-van-canh", slug: "van-canh", name: "Vân Canh" }
            ]
        },
        {
            id: "vn-central-phu-yen",
            slug: "phu-yen",
            name: "Phú Yên",
            aliases: ["phu-yen"],
            provinceCode: "54",
            areas: [
                { id: "phu-yen-tuy-hoa", slug: "tuy-hoa", name: "Tuy Hòa" },
                { id: "phu-yen-song-cau", slug: "song-cau", name: "Sông Cầu" },
                { id: "phu-yen-dong-hoa", slug: "dong-hoa", name: "Đông Hòa" },
                { id: "phu-yen-dong-xuan", slug: "dong-xuan", name: "Đồng Xuân" },
                { id: "phu-yen-tuy-an", slug: "tuy-an", name: "Tuy An" },
                { id: "phu-yen-son-hoa", slug: "son-hoa", name: "Sơn Hòa" },
                { id: "phu-yen-song-hinh", slug: "song-hinh", name: "Sông Hinh" },
                { id: "phu-yen-phu-hoa", slug: "phu-hoa", name: "Phú Hòa" },
                { id: "phu-yen-tay-hoa", slug: "tay-hoa", name: "Tây Hòa" }
            ]
        },
        {
            id: "vn-central-khanh-hoa",
            slug: "khanh-hoa",
            name: "Khánh Hòa",
            aliases: ["khanh-hoa"],
            provinceCode: "56",
            areas: [
                { id: "khanh-hoa-nha-trang", slug: "nha-trang", name: "Nha Trang" },
                { id: "khanh-hoa-cam-ranh", slug: "cam-ranh", name: "Cam Ranh" },
                { id: "khanh-hoa-ninh-hoa", slug: "ninh-hoa", name: "Ninh Hòa" },
                { id: "khanh-hoa-van-ninh", slug: "van-ninh", name: "Vạn Ninh" },
                { id: "khanh-hoa-dien-khanh", slug: "dien-khanh", name: "Diên Khánh" },
                { id: "khanh-hoa-khanh-vinh", slug: "khanh-vinh", name: "Khánh Vĩnh" },
                { id: "khanh-hoa-khanh-son", slug: "khanh-son", name: "Khánh Sơn" },
                { id: "khanh-hoa-cam-lam", slug: "cam-lam", name: "Cam Lâm" },
                { id: "khanh-hoa-truong-sa", slug: "truong-sa", name: "Trường Sa" }
            ]
        },
        {
            id: "vn-central-ninh-thuan",
            slug: "ninh-thuan",
            name: "Ninh Thuận",
            aliases: ["ninh-thuan"],
            provinceCode: "58",
            areas: [
                { id: "ninh-thuan-phan-rang-thap-cham", slug: "phan-rang-thap-cham", name: "Phan Rang-Tháp Chàm" },
                { id: "ninh-thuan-bac-ai", slug: "bac-ai", name: "Bác Ái" },
                { id: "ninh-thuan-ninh-son", slug: "ninh-son", name: "Ninh Sơn" },
                { id: "ninh-thuan-ninh-hai", slug: "ninh-hai", name: "Ninh Hải" },
                { id: "ninh-thuan-ninh-phuoc", slug: "ninh-phuoc", name: "Ninh Phước" },
                { id: "ninh-thuan-thuan-bac", slug: "thuan-bac", name: "Thuận Bắc" },
                { id: "ninh-thuan-thuan-nam", slug: "thuan-nam", name: "Thuận Nam" }
            ]
        },
        {
            id: "vn-central-binh-thuan",
            slug: "binh-thuan",
            name: "Bình Thuận",
            aliases: ["binh-thuan"],
            provinceCode: "60",
            areas: [
                { id: "binh-thuan-phan-thiet", slug: "phan-thiet", name: "Phan Thiết" },
                { id: "binh-thuan-la-gi", slug: "la-gi", name: "La Gi" },
                { id: "binh-thuan-tuy-phong", slug: "tuy-phong", name: "Tuy Phong" },
                { id: "binh-thuan-bac-binh", slug: "bac-binh", name: "Bắc Bình" },
                { id: "binh-thuan-ham-thuan-bac", slug: "ham-thuan-bac", name: "Hàm Thuận Bắc" },
                { id: "binh-thuan-ham-thuan-nam", slug: "ham-thuan-nam", name: "Hàm Thuận Nam" },
                { id: "binh-thuan-tanh-linh", slug: "tanh-linh", name: "Tánh Linh" },
                { id: "binh-thuan-duc-linh", slug: "duc-linh", name: "Đức Linh" },
                { id: "binh-thuan-ham-tan", slug: "ham-tan", name: "Hàm Tân" },
                { id: "binh-thuan-phu-quy", slug: "phu-quy", name: "Phú Quý" }
            ]
        }
    ],
    tay_nguyen: [
        {
            id: "vn-highlands-kon-tum",
            slug: "kon-tum",
            name: "Kon Tum",
            aliases: ["kon-tum"],
            provinceCode: "62",
            areas: [
                { id: "kon-tum-kon-tum", slug: "kon-tum", name: "Kon Tum" },
                { id: "kon-tum-dak-glei", slug: "dak-glei", name: "Đăk Glei" },
                { id: "kon-tum-ngoc-hoi", slug: "ngoc-hoi", name: "Ngọc Hồi" },
                { id: "kon-tum-dak-to", slug: "dak-to", name: "Đăk Tô" },
                { id: "kon-tum-kon-plong", slug: "kon-plong", name: "Kon Plông" },
                { id: "kon-tum-kon-ray", slug: "kon-ray", name: "Kon Rẫy" },
                { id: "kon-tum-dak-ha", slug: "dak-ha", name: "Đăk Hà" },
                { id: "kon-tum-sa-thay", slug: "sa-thay", name: "Sa Thầy" },
                { id: "kon-tum-tu-mo-rong", slug: "tu-mo-rong", name: "Tu Mơ Rông" },
                { id: "kon-tum-ia-h-drai", slug: "ia-h-drai", name: "Ia H'Drai" }
            ]
        },
        {
            id: "vn-highlands-gia-lai",
            slug: "gia-lai",
            name: "Gia Lai",
            aliases: ["gia-lai"],
            provinceCode: "64",
            areas: [
                { id: "gia-lai-pleiku", slug: "pleiku", name: "Pleiku" },
                { id: "gia-lai-an-khe", slug: "an-khe", name: "An Khê" },
                { id: "gia-lai-ayun-pa", slug: "ayun-pa", name: "Ayun Pa" },
                { id: "gia-lai-kbang", slug: "kbang", name: "KBang" },
                { id: "gia-lai-dak-doa", slug: "dak-doa", name: "Đăk Đoa" },
                { id: "gia-lai-chu-pah", slug: "chu-pah", name: "Chư Păh" },
                { id: "gia-lai-ia-grai", slug: "ia-grai", name: "Ia Grai" },
                { id: "gia-lai-mang-yang", slug: "mang-yang", name: "Mang Yang" },
                { id: "gia-lai-kong-chro", slug: "kong-chro", name: "Kông Chro" },
                { id: "gia-lai-duc-co", slug: "duc-co", name: "Đức Cơ" },
                { id: "gia-lai-chu-prong", slug: "chu-prong", name: "Chư Prông" },
                { id: "gia-lai-chu-se", slug: "chu-se", name: "Chư Sê" },
                { id: "gia-lai-dak-po", slug: "dak-po", name: "Đăk Pơ" },
                { id: "gia-lai-ia-pa", slug: "ia-pa", name: "Ia Pa" },
                { id: "gia-lai-krong-pa", slug: "krong-pa", name: "Krông Pa" },
                { id: "gia-lai-phu-thien", slug: "phu-thien", name: "Phú Thiện" },
                { id: "gia-lai-chu-puh", slug: "chu-puh", name: "Chư Pưh" }
            ]
        },
        {
            id: "vn-highlands-dak-lak",
            slug: "dak-lak",
            name: "Đắk Lắk",
            aliases: ["dak-lak"],
            provinceCode: "66",
            areas: [
                { id: "dak-lak-buon-ma-thuot", slug: "buon-ma-thuot", name: "Buôn Ma Thuột" },
                { id: "dak-lak-buon-ho", slug: "buon-ho", name: "Buôn Hồ" },
                { id: "dak-lak-ea-h-leo", slug: "ea-h-leo", name: "Ea H'leo" },
                { id: "dak-lak-ea-sup", slug: "ea-sup", name: "Ea Súp" },
                { id: "dak-lak-krong-nang", slug: "krong-nang", name: "Krông Năng" },
                { id: "dak-lak-krong-buk", slug: "krong-buk", name: "Krông Búk" },
                { id: "dak-lak-buon-don", slug: "buon-don", name: "Buôn Đôn" },
                { id: "dak-lak-cu-m-gar", slug: "cu-m-gar", name: "Cư M'gar" },
                { id: "dak-lak-ea-kar", slug: "ea-kar", name: "Ea Kar" },
                { id: "dak-lak-m-drak", slug: "m-drak", name: "M'Đrắk" },
                { id: "dak-lak-krong-bong", slug: "krong-bong", name: "Krông Bông" },
                { id: "dak-lak-krong-pac", slug: "krong-pac", name: "Krông Pắc" },
                { id: "dak-lak-krong-ana", slug: "krong-ana", name: "Krông Ana" },
                { id: "dak-lak-lak", slug: "lak", name: "Lắk" },
                { id: "dak-lak-cu-kuin", slug: "cu-kuin", name: "Cư Kuin" }
            ]
        },
        {
            id: "vn-highlands-dak-nong",
            slug: "dak-nong",
            name: "Đắk Nông",
            aliases: ["dak-nong"],
            provinceCode: "67",
            areas: [
                { id: "dak-nong-gia-nghia", slug: "gia-nghia", name: "Gia Nghĩa" },
                { id: "dak-nong-dak-glong", slug: "dak-glong", name: "Đăk Glong" },
                { id: "dak-nong-cu-jut", slug: "cu-jut", name: "Cư Jút" },
                { id: "dak-nong-dak-mil", slug: "dak-mil", name: "Đắk Mil" },
                { id: "dak-nong-krong-no", slug: "krong-no", name: "Krông Nô" },
                { id: "dak-nong-dak-song", slug: "dak-song", name: "Đắk Song" },
                { id: "dak-nong-dak-r-lap", slug: "dak-r-lap", name: "Đắk R'lấp" },
                { id: "dak-nong-tuy-duc", slug: "tuy-duc", name: "Tuy Đức" }
            ]
        },
        {
            id: "vn-highlands-lam-dong",
            slug: "lam-dong",
            name: "Lâm Đồng",
            aliases: ["lam-dong"],
            provinceCode: "68",
            areas: [
                { id: "lam-dong-da-lat", slug: "da-lat", name: "Đà Lạt" },
                { id: "lam-dong-bao-loc", slug: "bao-loc", name: "Bảo Lộc" },
                { id: "lam-dong-dam-rong", slug: "dam-rong", name: "Đam Rông" },
                { id: "lam-dong-lac-duong", slug: "lac-duong", name: "Lạc Dương" },
                { id: "lam-dong-lam-ha", slug: "lam-ha", name: "Lâm Hà" },
                { id: "lam-dong-don-duong", slug: "don-duong", name: "Đơn Dương" },
                { id: "lam-dong-duc-trong", slug: "duc-trong", name: "Đức Trọng" },
                { id: "lam-dong-di-linh", slug: "di-linh", name: "Di Linh" },
                { id: "lam-dong-bao-lam", slug: "bao-lam", name: "Bảo Lâm" },
                { id: "lam-dong-da-huoai", slug: "da-huoai", name: "Đạ Huoai" },
                { id: "lam-dong-da-teh", slug: "da-teh", name: "Đạ Tẻh" },
                { id: "lam-dong-cat-tien", slug: "cat-tien", name: "Cát Tiên" }
            ]
        }
    ],
    nam: [
        {
            id: "vn-south-ho-chi-minh",
            slug: "ho-chi-minh",
            name: "Hồ Chí Minh",
            aliases: ["ho-chi-minh", "hcm", "tphcm", "sai-gon"],
            provinceCode: "79",
            areas: [
                { id: "ho-chi-minh-quan-1", slug: "quan-1", name: "Quận 1" },
                { id: "ho-chi-minh-quan-2", slug: "quan-2", name: "Quận 2" },
                { id: "ho-chi-minh-quan-3", slug: "quan-3", name: "Quận 3" },
                { id: "ho-chi-minh-quan-4", slug: "quan-4", name: "Quận 4" },
                { id: "ho-chi-minh-quan-5", slug: "quan-5", name: "Quận 5" },
                { id: "ho-chi-minh-quan-6", slug: "quan-6", name: "Quận 6" },
                { id: "ho-chi-minh-quan-7", slug: "quan-7", name: "Quận 7" },
                { id: "ho-chi-minh-quan-8", slug: "quan-8", name: "Quận 8" },
                { id: "ho-chi-minh-quan-9", slug: "quan-9", name: "Quận 9" },
                { id: "ho-chi-minh-quan-10", slug: "quan-10", name: "Quận 10" },
                { id: "ho-chi-minh-quan-11", slug: "quan-11", name: "Quận 11" },
                { id: "ho-chi-minh-quan-12", slug: "quan-12", name: "Quận 12" },
                { id: "ho-chi-minh-binh-thanh", slug: "binh-thanh", name: "Bình Thạnh" },
                { id: "ho-chi-minh-tan-binh", slug: "tan-binh", name: "Tân Bình" },
                { id: "ho-chi-minh-phu-nhuan", slug: "phu-nhuan", name: "Phú Nhuận" },
                { id: "ho-chi-minh-go-vap", slug: "go-vap", name: "Gò Vấp" },
                { id: "ho-chi-minh-thu-duc", slug: "thu-duc", name: "Thủ Đức" },
                { id: "ho-chi-minh-tan-phu", slug: "tan-phu", name: "Tân Phú" },
                { id: "ho-chi-minh-binh-tan", slug: "binh-tan", name: "Bình Tân" },
                { id: "ho-chi-minh-cu-chi", slug: "cu-chi", name: "Củ Chi" },
                { id: "ho-chi-minh-hoc-mon", slug: "hoc-mon", name: "Hóc Môn" },
                { id: "ho-chi-minh-binh-chanh", slug: "binh-chanh", name: "Bình Chánh" },
                { id: "ho-chi-minh-nha-be", slug: "nha-be", name: "Nhà Bè" },
                { id: "ho-chi-minh-can-gio", slug: "can-gio", name: "Cần Giờ" }
            ]
        },
        {
            id: "vn-south-ba-ria-vung-tau",
            slug: "ba-ria-vung-tau",
            name: "Bà Rịa - Vũng Tàu",
            aliases: ["ba-ria-vung-tau", "brvt", "vung-tau"],
            provinceCode: "77",
            areas: [
                { id: "ba-ria-vung-tau-vung-tau", slug: "vung-tau", name: "Vũng Tàu" },
                { id: "ba-ria-vung-tau-ba-ria", slug: "ba-ria", name: "Bà Rịa" },
                { id: "ba-ria-vung-tau-phu-my", slug: "phu-my", name: "Phú Mỹ" },
                { id: "ba-ria-vung-tau-chau-duc", slug: "chau-duc", name: "Châu Đức" },
                { id: "ba-ria-vung-tau-xuyen-moc", slug: "xuyen-moc", name: "Xuyên Mộc" },
                { id: "ba-ria-vung-tau-long-dien", slug: "long-dien", name: "Long Điền" },
                { id: "ba-ria-vung-tau-dat-do", slug: "dat-do", name: "Đất Đỏ" },
                { id: "ba-ria-vung-tau-con-dao", slug: "con-dao", name: "Côn Đảo" }
            ]
        },
        {
            id: "vn-south-binh-duong",
            slug: "binh-duong",
            name: "Bình Dương",
            aliases: ["binh-duong"],
            provinceCode: "74",
            areas: [
                { id: "binh-duong-thu-dau-mot", slug: "thu-dau-mot", name: "Thủ Dầu Một" },
                { id: "binh-duong-di-an", slug: "di-an", name: "Dĩ An" },
                { id: "binh-duong-thuan-an", slug: "thuan-an", name: "Thuận An" },
                { id: "binh-duong-tan-uyen", slug: "tan-uyen", name: "Tân Uyên" },
                { id: "binh-duong-ben-cat", slug: "ben-cat", name: "Bến Cát" },
                { id: "binh-duong-bau-bang", slug: "bau-bang", name: "Bàu Bàng" },
                { id: "binh-duong-dau-tieng", slug: "dau-tieng", name: "Dầu Tiếng" },
                { id: "binh-duong-phu-giao", slug: "phu-giao", name: "Phú Giáo" },
                { id: "binh-duong-bac-tan-uyen", slug: "bac-tan-uyen", name: "Bắc Tân Uyên" }
            ]
        },
        {
            id: "vn-south-dong-nai",
            slug: "dong-nai",
            name: "Đồng Nai",
            aliases: ["dong-nai"],
            provinceCode: "75",
            areas: [
                { id: "dong-nai-bien-hoa", slug: "bien-hoa", name: "Biên Hòa" },
                { id: "dong-nai-long-khanh", slug: "long-khanh", name: "Long Khánh" },
                { id: "dong-nai-tan-phu", slug: "tan-phu", name: "Tân Phú" },
                { id: "dong-nai-vinh-cuu", slug: "vinh-cuu", name: "Vĩnh Cửu" },
                { id: "dong-nai-dinh-quan", slug: "dinh-quan", name: "Định Quán" },
                { id: "dong-nai-trang-bom", slug: "trang-bom", name: "Trảng Bom" },
                { id: "dong-nai-thong-nhat", slug: "thong-nhat", name: "Thống Nhất" },
                { id: "dong-nai-cam-my", slug: "cam-my", name: "Cẩm Mỹ" },
                { id: "dong-nai-long-thanh", slug: "long-thanh", name: "Long Thành" },
                { id: "dong-nai-xuan-loc", slug: "xuan-loc", name: "Xuân Lộc" },
                { id: "dong-nai-nhon-trach", slug: "nhon-trach", name: "Nhơn Trạch" }
            ]
        },
        {
            id: "vn-south-binh-phuoc",
            slug: "binh-phuoc",
            name: "Bình Phước",
            aliases: ["binh-phuoc"],
            provinceCode: "70",
            areas: [
                { id: "binh-phuoc-dong-xoai", slug: "dong-xoai", name: "Đồng Xoài" },
                { id: "binh-phuoc-binh-long", slug: "binh-long", name: "Bình Long" },
                { id: "binh-phuoc-phuoc-long", slug: "phuoc-long", name: "Phước Long" },
                { id: "binh-phuoc-bu-gia-map", slug: "bu-gia-map", name: "Bù Gia Mập" },
                { id: "binh-phuoc-loc-ninh", slug: "loc-ninh", name: "Lộc Ninh" },
                { id: "binh-phuoc-bu-dop", slug: "bu-dop", name: "Bù Đốp" },
                { id: "binh-phuoc-hon-quan", slug: "hon-quan", name: "Hớn Quản" },
                { id: "binh-phuoc-dong-phu", slug: "dong-phu", name: "Đồng Phú" },
                { id: "binh-phuoc-bu-dang", slug: "bu-dang", name: "Bù Đăng" },
                { id: "binh-phuoc-chon-thanh", slug: "chon-thanh", name: "Chơn Thành" },
                { id: "binh-phuoc-phu-rieng", slug: "phu-rieng", name: "Phú Riềng" }
            ]
        },
        {
            id: "vn-south-tay-ninh",
            slug: "tay-ninh",
            name: "Tây Ninh",
            aliases: ["tay-ninh"],
            provinceCode: "72",
            areas: [
                { id: "tay-ninh-tay-ninh", slug: "tay-ninh", name: "Tây Ninh" },
                { id: "tay-ninh-trang-bang", slug: "trang-bang", name: "Trảng Bàng" },
                { id: "tay-ninh-hoa-thanh", slug: "hoa-thanh", name: "Hòa Thành" },
                { id: "tay-ninh-tan-bien", slug: "tan-bien", name: "Tân Biên" },
                { id: "tay-ninh-tan-chau", slug: "tan-chau", name: "Tân Châu" },
                { id: "tay-ninh-duong-minh-chau", slug: "duong-minh-chau", name: "Dương Minh Châu" },
                { id: "tay-ninh-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "tay-ninh-ben-cau", slug: "ben-cau", name: "Bến Cầu" },
                { id: "tay-ninh-go-dau", slug: "go-dau", name: "Gò Dầu" }
            ]
        },
        {
            id: "vn-south-long-an",
            slug: "long-an",
            name: "Long An",
            aliases: ["long-an"],
            provinceCode: "80",
            areas: [
                { id: "long-an-tan-an", slug: "tan-an", name: "Tân An" },
                { id: "long-an-kien-tuong", slug: "kien-tuong", name: "Kiến Tường" },
                { id: "long-an-tan-hung", slug: "tan-hung", name: "Tân Hưng" },
                { id: "long-an-vinh-hung", slug: "vinh-hung", name: "Vĩnh Hưng" },
                { id: "long-an-moc-hoa", slug: "moc-hoa", name: "Mộc Hóa" },
                { id: "long-an-tan-thanh", slug: "tan-thanh", name: "Tân Thạnh" },
                { id: "long-an-thanh-hoa", slug: "thanh-hoa", name: "Thạnh Hóa" },
                { id: "long-an-duc-hue", slug: "duc-hue", name: "Đức Huệ" },
                { id: "long-an-duc-hoa", slug: "duc-hoa", name: "Đức Hòa" },
                { id: "long-an-ben-luc", slug: "ben-luc", name: "Bến Lức" },
                { id: "long-an-thu-thua", slug: "thu-thua", name: "Thủ Thừa" },
                { id: "long-an-tan-tru", slug: "tan-tru", name: "Tân Trụ" },
                { id: "long-an-can-duoc", slug: "can-duoc", name: "Cần Đước" },
                { id: "long-an-can-giuoc", slug: "can-giuoc", name: "Cần Giuộc" },
                { id: "long-an-chau-thanh", slug: "chau-thanh", name: "Châu Thành" }
            ]
        },
        {
            id: "vn-south-tien-giang",
            slug: "tien-giang",
            name: "Tiền Giang",
            aliases: ["tien-giang"],
            provinceCode: "82",
            areas: [
                { id: "tien-giang-my-tho", slug: "my-tho", name: "Mỹ Tho" },
                { id: "tien-giang-go-cong", slug: "go-cong", name: "Gò Công" },
                { id: "tien-giang-cai-lay", slug: "cai-lay", name: "Cai Lậy" },
                { id: "tien-giang-tan-phuoc", slug: "tan-phuoc", name: "Tân Phước" },
                { id: "tien-giang-cai-be", slug: "cai-be", name: "Cái Bè" },
                { id: "tien-giang-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "tien-giang-cho-gao", slug: "cho-gao", name: "Chợ Gạo" },
                { id: "tien-giang-go-cong-tay", slug: "go-cong-tay", name: "Gò Công Tây" },
                { id: "tien-giang-go-cong-dong", slug: "go-cong-dong", name: "Gò Công Đông" },
                { id: "tien-giang-tan-phu-dong", slug: "tan-phu-dong", name: "Tân Phú Đông" }
            ]
        },
        {
            id: "vn-south-ben-tre",
            slug: "ben-tre",
            name: "Bến Tre",
            aliases: ["ben-tre"],
            provinceCode: "83",
            areas: [
                { id: "ben-tre-ben-tre", slug: "ben-tre", name: "Bến Tre" },
                { id: "ben-tre-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "ben-tre-cho-lach", slug: "cho-lach", name: "Chợ Lách" },
                { id: "ben-tre-mo-cay-nam", slug: "mo-cay-nam", name: "Mỏ Cày Nam" },
                { id: "ben-tre-mo-cay-bac", slug: "mo-cay-bac", name: "Mỏ Cày Bắc" },
                { id: "ben-tre-giong-trom", slug: "giong-trom", name: "Giồng Trôm" },
                { id: "ben-tre-binh-dai", slug: "binh-dai", name: "Bình Đại" },
                { id: "ben-tre-ba-tri", slug: "ba-tri", name: "Ba Tri" },
                { id: "ben-tre-thanh-phu", slug: "thanh-phu", name: "Thạnh Phú" }
            ]
        },
        {
            id: "vn-south-tra-vinh",
            slug: "tra-vinh",
            name: "Trà Vinh",
            aliases: ["tra-vinh"],
            provinceCode: "84",
            areas: [
                { id: "tra-vinh-tra-vinh", slug: "tra-vinh", name: "Trà Vinh" },
                { id: "tra-vinh-duyen-hai", slug: "duyen-hai", name: "Duyên Hải" },
                { id: "tra-vinh-cang-long", slug: "cang-long", name: "Càng Long" },
                { id: "tra-vinh-cau-ke", slug: "cau-ke", name: "Cầu Kè" },
                { id: "tra-vinh-tieu-can", slug: "tieu-can", name: "Tiểu Cần" },
                { id: "tra-vinh-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "tra-vinh-cau-ngang", slug: "cau-ngang", name: "Cầu Ngang" },
                { id: "tra-vinh-tra-cu", slug: "tra-cu", name: "Trà Cú" }
            ]
        },
        {
            id: "vn-south-vinh-long",
            slug: "vinh-long",
            name: "Vĩnh Long",
            aliases: ["vinh-long"],
            provinceCode: "86",
            areas: [
                { id: "vinh-long-vinh-long", slug: "vinh-long", name: "Vĩnh Long" },
                { id: "vinh-long-binh-minh", slug: "binh-minh", name: "Bình Minh" },
                { id: "vinh-long-long-ho", slug: "long-ho", name: "Long Hồ" },
                { id: "vinh-long-mang-thit", slug: "mang-thit", name: "Mang Thít" },
                { id: "vinh-long-vung-liem", slug: "vung-liem", name: "Vũng Liêm" },
                { id: "vinh-long-tam-binh", slug: "tam-binh", name: "Tam Bình" },
                { id: "vinh-long-tra-on", slug: "tra-on", name: "Trà Ôn" },
                { id: "vinh-long-binh-tan", slug: "binh-tan", name: "Bình Tân" }
            ]
        },
        {
            id: "vn-south-dong-thap",
            slug: "dong-thap",
            name: "Đồng Tháp",
            aliases: ["dong-thap"],
            provinceCode: "87",
            areas: [
                { id: "dong-thap-cao-lanh", slug: "cao-lanh", name: "Cao Lãnh" },
                { id: "dong-thap-sa-dec", slug: "sa-dec", name: "Sa Đéc" },
                { id: "dong-thap-hong-ngu", slug: "hong-ngu", name: "Hồng Ngự" },
                { id: "dong-thap-tan-hong", slug: "tan-hong", name: "Tân Hồng" },
                { id: "dong-thap-tam-nong", slug: "tam-nong", name: "Tam Nông" },
                { id: "dong-thap-thap-muoi", slug: "thap-muoi", name: "Tháp Mười" },
                { id: "dong-thap-thanh-binh", slug: "thanh-binh", name: "Thanh Bình" },
                { id: "dong-thap-lap-vo", slug: "lap-vo", name: "Lấp Vò" },
                { id: "dong-thap-lai-vung", slug: "lai-vung", name: "Lai Vung" },
                { id: "dong-thap-chau-thanh", slug: "chau-thanh", name: "Châu Thành" }
            ]
        },
        {
            id: "vn-south-an-giang",
            slug: "an-giang",
            name: "An Giang",
            aliases: ["an-giang"],
            provinceCode: "89",
            areas: [
                { id: "an-giang-long-xuyen", slug: "long-xuyen", name: "Long Xuyên" },
                { id: "an-giang-chau-doc", slug: "chau-doc", name: "Châu Đốc" },
                { id: "an-giang-tan-chau", slug: "tan-chau", name: "Tân Châu" },
                { id: "an-giang-an-phu", slug: "an-phu", name: "An Phú" },
                { id: "an-giang-tinh-bien", slug: "tinh-bien", name: "Tịnh Biên" },
                { id: "an-giang-tri-ton", slug: "tri-ton", name: "Tri Tôn" },
                { id: "an-giang-chau-phu", slug: "chau-phu", name: "Châu Phú" },
                { id: "an-giang-cho-moi", slug: "cho-moi", name: "Chợ Mới" },
                { id: "an-giang-phu-tan", slug: "phu-tan", name: "Phú Tân" },
                { id: "an-giang-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "an-giang-thoai-son", slug: "thoai-son", name: "Thoại Sơn" }
            ]
        },
        {
            id: "vn-south-kien-giang",
            slug: "kien-giang",
            name: "Kiên Giang",
            aliases: ["kien-giang"],
            provinceCode: "91",
            areas: [
                { id: "kien-giang-rach-gia", slug: "rach-gia", name: "Rạch Giá" },
                { id: "kien-giang-ha-tien", slug: "ha-tien", name: "Hà Tiên" },
                { id: "kien-giang-kien-luong", slug: "kien-luong", name: "Kiên Lương" },
                { id: "kien-giang-hon-dat", slug: "hon-dat", name: "Hòn Đất" },
                { id: "kien-giang-tan-hiep", slug: "tan-hiep", name: "Tân Hiệp" },
                { id: "kien-giang-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "kien-giang-giong-rieng", slug: "giong-rieng", name: "Giồng Riềng" },
                { id: "kien-giang-go-quao", slug: "go-quao", name: "Gò Quao" },
                { id: "kien-giang-an-bien", slug: "an-bien", name: "An Biên" },
                { id: "kien-giang-an-minh", slug: "an-minh", name: "An Minh" },
                { id: "kien-giang-vinh-thuan", slug: "vinh-thuan", name: "Vĩnh Thuận" },
                { id: "kien-giang-u-minh-thuong", slug: "u-minh-thuong", name: "U Minh Thượng" },
                { id: "kien-giang-giang-thanh", slug: "giang-thanh", name: "Giang Thành" },
                { id: "kien-giang-phu-quoc", slug: "phu-quoc", name: "Phú Quốc" },
                { id: "kien-giang-kien-hai", slug: "kien-hai", name: "Kiên Hải" }
            ]
        },
        {
            id: "vn-south-can-tho",
            slug: "can-tho",
            name: "Cần Thơ",
            aliases: ["can-tho", "ct"],
            provinceCode: "92",
            areas: [
                { id: "can-tho-ninh-kieu", slug: "ninh-kieu", name: "Ninh Kiều" },
                { id: "can-tho-o-mon", slug: "o-mon", name: "Ô Môn" },
                { id: "can-tho-binh-thuy", slug: "binh-thuy", name: "Bình Thủy" },
                { id: "can-tho-cai-rang", slug: "cai-rang", name: "Cái Răng" },
                { id: "can-tho-thot-not", slug: "thot-not", name: "Thốt Nốt" },
                { id: "can-tho-vinh-thanh", slug: "vinh-thanh", name: "Vĩnh Thạnh" },
                { id: "can-tho-co-do", slug: "co-do", name: "Cờ Đỏ" },
                { id: "can-tho-phong-dien", slug: "phong-dien", name: "Phong Điền" },
                { id: "can-tho-thoi-lai", slug: "thoi-lai", name: "Thới Lai" }
            ]
        },
        {
            id: "vn-south-hau-giang",
            slug: "hau-giang",
            name: "Hậu Giang",
            aliases: ["hau-giang"],
            provinceCode: "93",
            areas: [
                { id: "hau-giang-vi-thanh", slug: "vi-thanh", name: "Vị Thanh" },
                { id: "hau-giang-nga-bay", slug: "nga-bay", name: "Ngã Bảy" },
                { id: "hau-giang-long-my", slug: "long-my", name: "Long Mỹ" },
                { id: "hau-giang-chau-thanh-a", slug: "chau-thanh-a", name: "Châu Thành A" },
                { id: "hau-giang-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "hau-giang-phung-hiep", slug: "phung-hiep", name: "Phụng Hiệp" },
                { id: "hau-giang-vi-thuy", slug: "vi-thuy", name: "Vị Thủy" }
            ]
        },
        {
            id: "vn-south-soc-trang",
            slug: "soc-trang",
            name: "Sóc Trăng",
            aliases: ["soc-trang"],
            provinceCode: "94",
            areas: [
                { id: "soc-trang-soc-trang", slug: "soc-trang", name: "Sóc Trăng" },
                { id: "soc-trang-vinh-chau", slug: "vinh-chau", name: "Vĩnh Châu" },
                { id: "soc-trang-nga-nam", slug: "nga-nam", name: "Ngã Năm" },
                { id: "soc-trang-chau-thanh", slug: "chau-thanh", name: "Châu Thành" },
                { id: "soc-trang-ke-sach", slug: "ke-sach", name: "Kế Sách" },
                { id: "soc-trang-my-tu", slug: "my-tu", name: "Mỹ Tú" },
                { id: "soc-trang-cu-lao-dung", slug: "cu-lao-dung", name: "Cù Lao Dung" },
                { id: "soc-trang-long-phu", slug: "long-phu", name: "Long Phú" },
                { id: "soc-trang-my-xuyen", slug: "my-xuyen", name: "Mỹ Xuyên" },
                { id: "soc-trang-thanh-tri", slug: "thanh-tri", name: "Thạnh Trị" },
                { id: "soc-trang-tran-de", slug: "tran-de", name: "Trần Đề" }
            ]
        },
        {
            id: "vn-south-bac-lieu",
            slug: "bac-lieu",
            name: "Bạc Liêu",
            aliases: ["bac-lieu"],
            provinceCode: "95",
            areas: [
                { id: "bac-lieu-bac-lieu", slug: "bac-lieu", name: "Bạc Liêu" },
                { id: "bac-lieu-gia-rai", slug: "gia-rai", name: "Giá Rai" },
                { id: "bac-lieu-hong-dan", slug: "hong-dan", name: "Hồng Dân" },
                { id: "bac-lieu-phuoc-long", slug: "phuoc-long", name: "Phước Long" },
                { id: "bac-lieu-vinh-loi", slug: "vinh-loi", name: "Vĩnh Lợi" },
                { id: "bac-lieu-dong-hai", slug: "dong-hai", name: "Đông Hải" },
                { id: "bac-lieu-hoa-binh", slug: "hoa-binh", name: "Hòa Bình" }
            ]
        },
        {
            id: "vn-south-ca-mau",
            slug: "ca-mau",
            name: "Cà Mau",
            aliases: ["ca-mau"],
            provinceCode: "96",
            areas: [
                { id: "ca-mau-ca-mau", slug: "ca-mau", name: "Cà Mau" },
                { id: "ca-mau-dam-doi", slug: "dam-doi", name: "Đầm Dơi" },
                { id: "ca-mau-ngoc-hien", slug: "ngoc-hien", name: "Ngọc Hiển" },
                { id: "ca-mau-cai-nuoc", slug: "cai-nuoc", name: "Cái Nước" },
                { id: "ca-mau-tran-van-thoi", slug: "tran-van-thoi", name: "Trần Văn Thời" },
                { id: "ca-mau-u-minh", slug: "u-minh", name: "U Minh" },
                { id: "ca-mau-thoi-binh", slug: "thoi-binh", name: "Thới Bình" },
                { id: "ca-mau-nam-can", slug: "nam-can", name: "Năm Căn" },
                { id: "ca-mau-phu-tan", slug: "phu-tan", name: "Phú Tân" }
            ]
        }
    ]
};