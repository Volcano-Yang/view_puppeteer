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

  //增加浏览量之后要等待一段时间，避免跳转太频繁被制裁
  await sleep(config.readTime);
}

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: true, //想要展示爬取过程的界面就设置为false
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
