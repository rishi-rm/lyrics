import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function getLyrics() {
    const browser = await puppeteer.launch({
        headless: false, // set to false so we visibly see loading when testing
        defaultViewport: null
    });
    const page = await browser.newPage();

    await page.goto("https://lyrics.lyricfind.com/lyrics/playboi-carti-like-weezy", {
        waitUntil: "networkidle2"
    });

    // 🔥 wait until lyric elements actually appear in DOM
    await page.waitForSelector('[data-testid="lyrics.lyricLine"]', { timeout: 20000 });

    // 👇 Sometimes lyrics load when scrolling — so scroll all the way down
    await autoScroll(page);

    const html = await page.content();
    const $ = cheerio.load(html);

    const lyrics = [];

    $('[data-testid="lyrics.lyricLine"]').each((i, el) => {
        lyrics.push($(el).text().trim());
    });

    console.log("\n📝 LYRICS:\n", lyrics.join("\n"), "\n\nTotal lines:", lyrics.length);
    await browser.close();
}

// helper for scrolling (many lyrics sites lazy-load)
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise(resolve => {
            let totalHeight = 0;
            const distance = 200;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}

getLyrics();
