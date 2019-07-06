import puppeteer from 'puppeteer'

const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
const BANK_NAME = 'BC'

export const crawlIns = async (name) => {
  try {
      const browser = await puppeteer.launch({headless: true})
      const page = await browser.newPage()
      page.setUserAgent(CHROME)
      page.setViewport({width: 1200, height: 1000})

      await page.goto(`https://www.instagram.com/${name}/`)
      await page.waitForSelector('.-vDIg')
      const title = await page.$eval('.rhpdm', ele => ele.innerText)
      const description = await page.$eval('.-vDIg span', ele => ele.innerText)

      console.log(title, description);

      // const users = await page.evaluate((sel) => {
      //   const $els = document.querySelector(sel);
      //   console.log($els.innerText);
      // }, TITLE);

      setTimeout(async ()=> {
        await browser.close()
      }, 5000)

  } catch (e) {
    console.log(e)
  }
}
