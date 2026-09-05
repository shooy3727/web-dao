const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');

// Hàm hỗ trợ giới hạn luồng chạy song song (Pool Limit)
async function asyncPool(poolLimit, array, iteratorFn) {
    const results = [];
    const executing = [];
    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item));
        results.push(p);

        if (poolLimit <= array.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(results);
}

// Hàm tải và xử lý ảnh tối ưu tốc độ (Chạy song song đa luồng cho các ảnh trong cùng 1 profile)
async function downloadAndProcessImages(imageUrls, provinceName, profileId) {
    if (!imageUrls || imageUrls.length === 0) return [];

    // Chuyển tên tỉnh thành dạngslug sạch sẽ để làm tên thư mục (ví dụ: "Sài Gòn" -> "sai-gon", "Bạc Liêu" -> "bac-lieu")
    const provinceSlug = provinceName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '')
        .replace(/(\s+)/g, '-');

    // Thư mục lưu trữ vật lý: public/uploads/profile/{tên-tỉnh}/{id}
    const dirPath = path.join(__dirname, 'public', 'uploads', 'profile', provinceSlug, String(profileId));
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const imageTasks = imageUrls.map((imgUrl, index) => {
        return async () => {
            const imageIndex = index + 1;
            const outputFileName = `${imageIndex}.webp`;
            const absoluteSavePath = path.join(dirPath, outputFileName);
            
            // Đường dẫn web tương ứng lưu vào data.json
            const relativeWebPath = `/uploads/profile/${provinceSlug}/${profileId}/${outputFileName}`;

            try {
                const response = await axios.get(imgUrl, { 
                    responseType: 'arraybuffer',
                    timeout: 15000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                });

                await sharp(response.data)
                    .resize(168, 280, {
                        fit: 'inside',
                        position: 'entropy',
                        kernel: sharp.kernel.lanczos3
                    })
                    .webp({
                        quality: 75,
                        effort: 6,
                        smartSubsample: true 
                    })
                    .toFile(absoluteSavePath);

                return relativeWebPath;
            } catch (err) {
                console.log(`⚠️ Lỗi tải/xử lý ảnh [${imgUrl}] cho profile ${profileId}: ${err.message}`);
                return null;
            }
        };
    });

    const results = await asyncPool(5, imageTasks, (task) => task());
    return results.filter(path => path !== null);
}

(async () => {
    console.log("Bắt đầu khởi chạy trình duyệt ngầm (Cập nhật xử lý & tải ảnh WebP 180x300)...");
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });

    const provinces = [
        // { name: "Bà Rịa - Vũng Tàu", href: "/gai-goi/ba-ria-vung-tau/" },
        // { name: "Bình Dương", href: "/gai-goi/binh-duong/" },
        // { name: "Cần Thơ", href: "/gai-goi/can-tho/" },
        // { name: "Đà Nẵng", href: "/gai-goi/da-nang/" },
        // { name: "Đồng Nai", href: "/gai-goi/dong-nai/" },
        // { name: "Hà Nội", href: "/gai-goi/ha-noi/" },
        // { name: "Huế", href: "/gai-goi/hue/" },
        // { name: "Khánh Hòa", href: "/gai-goi/khanh-hoa/" },
        // { name: "Lâm Đồng", href: "/gai-goi/lam-dong/" },
        // { name: "Long An", href: "/gai-goi/long-an/" },
        // { name: "Sài Gòn", href: "/gai-goi/sai-gon/" },
        // { name: "An Giang", href: "/gai-goi/an-giang/" },
        // { name: "Bắc Giang", href: "/gai-goi/bac-giang/" },
        // { name: "Bạc Liêu", href: "/gai-goi/bac-lieu/" },
        // { name: "Bắc Ninh", href: "/gai-goi/bac-ninh/" },
        // { name: "Bến Tre", href: "/gai-goi/ben-tre/" },
        // { name: "Bình Định", href: "/gai-goi/binh-dinh/" },
        // { name: "Bình Phước", href: "/gai-goi/binh-phuoc/" },
        // { name: "Bình Thuận", href: "/gai-goi/binh-thuan/" },
        // { name: "Cà Mau", href: "/gai-goi/ca-mau/" },
        // { name: "Đắk Lắk", href: "/gai-goi/dak-lak/" },
        // { name: "Đồng Tháp", href: "/gai-goi/dong-thap/" },
        // { name: "Hà Nam", href: "/gai-goi/ha-nam/" },
        // { name: "Hải Dương", href: "/gai-goi/hai-duong/" },
        // { name: "Hải Phòng", href: "/gai-goi/hai-phong/" },
        { name: "Hậu Giang", href: "/gai-goi/hau-giang/" },
        { name: "Hưng Yên", href: "/gai-goi/hung-yen/" },
        // { name: "Kiên Giang", href: "/gai-goi/kien-giang/" },
        // { name: "Nam Định", href: "/gai-goi/nam-dinh/" },
        // { name: "Ninh Bình", href: "/gai-goi/ninh-binh/" },
        // { name: "Ninh Thuận", href: "/gai-goi/ninh-thuan/" },
        // { name: "Phú Thọ", href: "/gai-goi/phu-tho/" },
        // { name: "Phú Yên", href: "/gai-goi/phu-yen/" },
        // { name: "Quảng Bình", href: "/gai-goi/quang-binh/" },
        // { name: "Quảng Ninh", href: "/gai-goi/quang-ninh/" },
        // { name: "Sóc Trăng", href: "/gai-goi/soc-trang/" },
        // { name: "Tây Ninh", href: "/gai-goi/tay-ninh/" }
    ];

    let allExtractedData = [];
    let globalId = 1;
    const domain = 'https://www.gaigoivc4.com';

    for (const province of provinces) {
        console.log(`\n========================================`);
        console.log(`Đang xử lý tỉnh: ${province.name}`);
        console.log(`========================================`);

        let page = 1;
        let hasMorePages = true;
        let provincePage;

        try {
            provincePage = await browser.newPage();
            await provincePage.setRequestInterception(true);
            provincePage.on('request', (req) => {
                if (['stylesheet', 'font', 'image', 'media'].includes(req.resourceType())) {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            let provinceCardsData = [];

            // Bước 1: Quét danh sách các thẻ bài đăng tại trang tỉnh
            while (hasMorePages) {
                const pageUrl = `${domain}${province.href}?page=${page}`;
                console.log(`Đang quét trang danh sách: ${pageUrl}`);

                await provincePage.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

                const pageCards = await provincePage.evaluate((provName) => {
                    const cards = document.querySelectorAll('div.group.relative');
                    const results = [];

                    cards.forEach(card => {
                        const linkEl = card.querySelector('a.absolute.inset-0');
                        const href = linkEl ? linkEl.href : null;
                        const title = linkEl ? linkEl.getAttribute('aria-label')?.replace('View listing for ', '') : 'N/A';

                        const priceEl = card.querySelector('.text-blue-600.font-bold') || card.querySelector('.font-bold.text-blue-600');
                        const price = priceEl ? priceEl.innerText.trim() : null;

                        const textItems = Array.from(card.querySelectorAll('.text-sm.text-gray-600 span, .text-sm.text-gray-300 span')).map(el => el.innerText.trim());
                        
                        let location = null;
                        let measurementsStr = null;
                        let heightStr = null;
                        let phone = null;
                        let views = 0;

                        textItems.forEach(txt => {
                            if (txt.includes(',')) location = txt;
                            if (/^\d{2}-\d{2}-\d{2}$/.test(txt)) measurementsStr = txt;
                            if (/^\d{3}cm$/.test(txt)) heightStr = txt;
                            if (/^0\d{9,10}$/.test(txt)) phone = txt;
                        });

                        const viewEl = card.querySelector('svg path[d*="M10 12.5"]')?.closest('div');
                        if (viewEl) {
                            const viewText = viewEl.innerText.replace(/\D/g, '');
                            if (viewText) views = parseInt(viewText, 10);
                        }

                        const verifiedEl = card.innerText.includes('Đã Xác Thực');

                        // Thay thế đoạn cào ảnh cũ trong card loop của Bước 1:
                        const images = [];
                        card.querySelectorAll('div.order-2 button img, .grid img, img[alt*="thumbnail"], img[class*="thumb"]').forEach(img => {
                            const src = img.src || img.getAttribute('data-src');
                            if (src && !src.includes('icon') && !src.includes('logo') && !src.includes('avatar')) {
                                images.push(src);
                            }
                        });

                        results.push({
                            province: provName,
                            title: title,
                            url: href,
                            location: location,
                            phone: phone,
                            price: price,
                            views: views,
                            is_verified: verifiedEl,
                            measurementsText: measurementsStr,
                            height: heightStr,
                            images: []
                        });
                    });

                    return results;
                }, province.name);

                if (pageCards.length === 0) {
                    hasMorePages = false;
                    break;
                }

                provinceCardsData.push(...pageCards);
                page++;
            }

            console.log(`=> Tổng quét được ${provinceCardsData.length} thẻ ở ${province.name}. Đang cào chi tiết...`);
            await provincePage.close();

            // Bước 2: Cào song song trang chi tiết
            // Bước 2: Cào song song trang chi tiết
            const scrapeDetailTask = async (cardData) => {
                if (!cardData.url) return cardData;

                let retries = 3;
                while (retries > 0) {
                    let detailPage;
                    try {
                        detailPage = await browser.newPage();
                        await detailPage.setRequestInterception(true);
                        detailPage.on('request', (req) => {
                            if (['stylesheet', 'font', 'media'].includes(req.resourceType())) {
                                req.abort();
                            } else {
                                req.continue();
                            }
                        });

                        await detailPage.goto(cardData.url, { waitUntil: 'domcontentloaded', timeout: 20000 });

                        // THAY THẾ BẰNG ĐOẠN NÀY:
                        const detailInfo = await detailPage.evaluate(() => {
                            const detailImages = [];
                            
                            const container = document.querySelector('div.order-2.md\\:order-1');
                            const imgElements = container ? container.querySelectorAll('img') : document.querySelectorAll('img');

                            imgElements.forEach(img => {
                                const src = img.src || img.getAttribute('src');
                                if (src && src.includes('/uploads/') && !detailImages.includes(src)) {
                                    detailImages.push(src);
                                }
                            });

                            const limitedImages = detailImages.slice(0, 5);

                            const descEl = document.querySelector('.content-detail, article .text-gray-700, .description');
                            const description = descEl ? descEl.innerText.trim() : null;

                            const servicesEl = document.querySelector('.services-list, .service-content');
                            const services = servicesEl ? servicesEl.innerText.trim() : null;

                            const phoneEl = document.querySelector('a[href^="tel:"]');
                            const phone = phoneEl ? phoneEl.innerText.trim() : null;

                            return { 
                                description, 
                                services, 
                                phone, 
                                images: limitedImages 
                            };
                        });

                        await detailPage.close();

                        cardData.description = detailInfo.description;
                        cardData.services = detailInfo.services;
                        if (!cardData.phone && detailInfo.phone) cardData.phone = detailInfo.phone;
                        if (detailInfo.images && detailInfo.images.length > 0) {
                            cardData.images = detailInfo.images;
                        }

                        return cardData;
                    } catch (err) {
                        if (detailPage) await detailPage.close();
                        retries--;
                        if (retries === 0) return cardData;
                        await new Promise(res => setTimeout(res, 1000));
                    }
                }
                return cardData;
            };

            const results = await asyncPool(8, provinceCardsData, scrapeDetailTask);

            let provinceExtractedCount = 0;
            for (const item of results) {
                if (item) {
                    let measurementsObj = {};
                    
                    if (item.measurementsText) {
                        const parts = item.measurementsText.split('-');
                        if (parts.length === 3) {
                            measurementsObj = { bust: parts[0], waist: parts[1], hips: parts[2] };
                        }
                    }

                    // Tải và xử lý ảnh với cấu trúc thư mục theo tên tỉnh
                    console.log(`Đang tải & xử lý ảnh cho ID: ${globalId} (${item.province})...`);
                    const localImagePaths = await downloadAndProcessImages(item.images || [], item.province, globalId);

                    const finalObject = {
                        id: globalId,
                        user_id: globalId,
                        province: item.province,
                        region: null,
                        area: null,
                        name_area: item.location,
                        title: item.title,
                        location: item.location,
                        phone: item.phone,
                        price: item.price,
                        birth: null,
                        height: item.height || null,
                        views: item.views || 0,
                        is_verified: item.is_verified || false,
                        is_profile_visible: true,
                        is_active: true,
                        measurements: measurementsObj,
                        description: item.description || null,
                        services: item.services || null,
                        images: localImagePaths, // Mảng đường dẫn kiểu ["/profile/1/1.webp", ...]
                        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
                    };

                    allExtractedData.push(finalObject);
                    globalId++;
                    provinceExtractedCount++;
                }
            }

            console.log(`=> Đã hoàn thành tỉnh ${province.name}: ${provinceExtractedCount} bản ghi.`);

        } catch (provErr) {
            console.log(`❌ Lỗi khi xử lý tỉnh ${province.name}: ${provErr.message}`);
            if (provincePage) await provincePage.close();
        }

        // Lưu backup file liên tục sau mỗi tỉnh
        fs.writeFileSync('data.json', JSON.stringify(allExtractedData, null, 2), 'utf-8');
    }

    await browser.close();
    console.log("\n========================================");
    console.log(`HOÀN TẤT! Đã lưu toàn bộ ${allExtractedData.length} bản ghi và xử lý ảnh xong.`);
    console.log("========================================");
})();