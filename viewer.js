const puppeteer = require("puppeteer");
const config = require("./config");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function PagetoJuejinUrl(page, url) {
  console.log(`—————————开始浏览文章${url}—————————`);

  await page.goto(url);

  await page.waitFor(
    "#juejin > div.view-container > main > div > div.main-area.article-area.shadow > article > h1"
  );

  await sleep(3000);
}

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 375,
    height: 667,
    deviceScaleFactor: 1,
  });

  for (item of config.articleList) {
    await PagetoJuejinUrl(page, item);
  }

  await browser.close();

  console.log("浏览量增加成功！！");
};
